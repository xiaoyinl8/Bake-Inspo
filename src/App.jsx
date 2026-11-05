import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES } from "./categories.js";

// Change this to your repo's issues page (or a mailto: link) so visitors can report wrong amounts
const FEEDBACK_URL = "https://github.com/xiaoyinl8/Bake-Inspo/issues/new";

const recipeFiles = import.meta.glob("./data/*.json", { eager: true });
const recipes = Object.values(recipeFiles).flatMap((m) => m.default);
const byId = Object.fromEntries(recipes.map((r) => [r.id, r]));

function buildCategories() {
  const cats = CATEGORIES.map((c) => ({
    ...c,
    subs: c.subs
      .map((s) => ({ name: s.name, recipes: s.ids.map((id) => byId[id]).filter(Boolean) }))
      .filter((s) => s.recipes.length > 0),
  })).filter((c) => c.subs.length > 0);
  const listed = new Set(CATEGORIES.flatMap((c) => c.subs.flatMap((s) => s.ids)));
  const extra = recipes.filter((r) => !listed.has(r.id));
  if (extra.length > 0) {
    cats.push({ id: "more", name: "More bakes", emoji: "✨", subs: [{ name: "Newly added", recipes: extra }] });
  }
  return cats.map((c) => ({
    ...c,
    count: new Set(c.subs.flatMap((s) => s.recipes.map((r) => r.id))).size,
  }));
}
const categories = buildCategories();

/* ---------- helpers ---------- */
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } },
};
function useStored(key, initial) {
  const [v, setV] = useState(() => store.get(key, initial));
  useEffect(() => { store.set(key, v); }, [key, v]);
  return [v, setV];
}

const minutesOf = (r) => {
  const h = /(\d+)\s*hour/.exec(r.totalTime);
  const m = /(\d+)\s*min/.exec(r.totalTime);
  return (h ? +h[1] * 60 : 0) + (m ? +m[1] : 0);
};
const fmtMins = (m) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60}` : ""}`);

// "190 °C" -> "375 °F", "26-28 °C" -> "80-85 °F" (works inside sentences too)
const fmtTemp = (t, f) =>
  !f || !t
    ? t
    : t.replace(/(\d+)(?:-(\d+))?\s*°C/g, (_, a, b) => {
        const c = (x) => Math.round((x * 9) / 5 / 5 + 32 / 5) * 5;
        return b ? `${c(+a)}-${c(+b)} °F` : `${c(+a)} °F`;
      });

const timerMinutes = (t) => {
  const m = /(\d+)(?:-\d+)?\s*(hour|min)/.exec(t || "");
  return m ? (m[2] === "hour" ? +m[1] * 60 : +m[1]) : 0;
};

const FILTERS = {
  "Under 1 hour": (r) => minutesOf(r) <= 60,
  Beginner: (r) => r.tags.includes("beginner"),
  "No yeast": (r) => !r.ingredients.some((i) => /yeast/i.test(i.name)),
  "Few ingredients": (r) => r.ingredients.length <= 6,
};

// Pantry items: label shown to the user + pattern matched against ingredient names
const PANTRY = [
  ["Eggs", /egg/i], ["Butter", /(?<!peanut )butter(?!milk)/i], ["Flour", /(?<!almond )flour/i],
  ["Sugar", /sugar/i], ["Milk", /\bmilk\b/i], ["Heavy cream", /heavy cream|whipping cream/i],
  ["Cream cheese", /cream cheese/i], ["Yeast", /yeast/i], ["Baking powder", /baking powder/i],
  ["Baking soda", /baking soda/i], ["Chocolate", /chocolate|chips/i], ["Cocoa", /cocoa/i],
  ["Vanilla", /vanilla/i], ["Lemons", /lemon/i], ["Apples", /apple/i], ["Bananas", /banana/i],
  ["Oats", /\boats?\b/i], ["Nuts", /almond|pistachio|walnut|pecan|peanut/i], ["Cinnamon", /cinnamon/i],
  ["Honey", /honey/i], ["Cheese", /cheddar|parmesan|gruy|swiss/i], ["Jam", /\bjam\b/i],
];
const ASSUMED = /\bsalt\b|\bwater\b/i; // never counted as missing
const cleanName = (n) => n.replace(/^[a-z ]+:\s*/i, "").replace(/\s*\(.*?\)/g, "");

const tokenize = (q) =>
  q.toLowerCase().split(/[,\s]+/).map((t) => t.trim()).filter(Boolean)
    .map((t) => (t.length > 3 && t.endsWith("s") && !t.endsWith("ss") ? t.slice(0, -1) : t));

function searchRecipes(query) {
  const words = tokenize(query);
  if (words.length === 0) return [];
  return recipes
    .map((r) => {
      const hay = [r.name, ...r.tags, ...r.ingredients.map((i) => i.name)].join(" ").toLowerCase();
      return { r, score: words.filter((w) => hay.includes(w)).length };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.r);
}

function beep() {
  try {
    const c = new AudioContext();
    const o = c.createOscillator();
    o.frequency.value = 880;
    o.connect(c.destination);
    o.start();
    o.stop(c.currentTime + 0.6);
  } catch { /* ignore */ }
}

/* ---------- small components ---------- */
function Tile({ emoji, name, meta, onClick }) {
  return (
    <button className="card" onClick={onClick}>
      {emoji && <span className="card-emoji" aria-hidden="true">{emoji}</span>}
      <span className="card-name">{name}</span>
      {meta && <span className="card-meta">{meta}</span>}
    </button>
  );
}

function RecipeCard({ r, cardProps }) {
  const isSaved = cardProps.saved.includes(r.id);
  return (
    <div className="card-wrap">
      <button className="card" onClick={() => cardProps.onOpen(r)}>
        <span className="card-emoji" aria-hidden="true">{r.emoji}</span>
        <span className="card-name">{r.name}</span>
        <span className="card-meta">{fmtMins(minutesOf(r))} · {r.yield}</span>
        {r.tags.includes("beginner") && <span className="chip">Beginner</span>}
      </button>
      <button
        className="heart"
        onClick={() => cardProps.onSave(r.id)}
        aria-pressed={isSaved}
        aria-label={isSaved ? `Remove ${r.name} from saved` : `Save ${r.name}`}
      >
        {isSaved ? "♥" : "♡"}
      </button>
    </div>
  );
}

function FilterBar({ active, onToggle }) {
  return (
    <div className="filters no-print" role="group" aria-label="Filters">
      {Object.keys(FILTERS).map((f) => (
        <button key={f} className="pill" aria-pressed={active.includes(f)} onClick={() => onToggle(f)}>
          {f}
        </button>
      ))}
    </div>
  );
}

function RecipeGrid({ list, active, cardProps }) {
  const shown = list.filter((r) => active.every((f) => FILTERS[f](r)));
  if (shown.length === 0) return <p className="empty">No recipes match those filters here.</p>;
  return (
    <section className="grid">
      {shown.map((r) => <RecipeCard key={r.id} r={r} cardProps={cardProps} />)}
    </section>
  );
}

function Crumbs({ cat, sub, onHome, onCat }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <button onClick={onHome}>All categories</button>
      <span aria-hidden="true">›</span>
      {sub ? <button onClick={onCat}>{cat.name}</button> : <strong>{cat.name}</strong>}
      {sub && (<><span aria-hidden="true">›</span><strong>{sub.name}</strong></>)}
    </nav>
  );
}

/* ---------- pantry mode ---------- */
function Pantry({ have, setHave, cardProps }) {
  const toggle = (l) => setHave(have.includes(l) ? have.filter((x) => x !== l) : [...have, l]);
  const ranked = useMemo(() => {
    if (have.length === 0) return [];
    return recipes
      .map((r) => {
        const needed = r.ingredients.filter((i) => !ASSUMED.test(i.name));
        const missing = needed.filter(
          (i) => !PANTRY.some(([label, re]) => have.includes(label) && re.test(i.name))
        );
        return { r, missing, hits: needed.length - missing.length };
      })
      .filter((x) => x.hits > 0)
      .sort((a, b) => a.missing.length - b.missing.length || b.hits - a.hits)
      .slice(0, 18);
  }, [have]);

  return (
    <>
      <h2>What's in your kitchen?</h2>
      <div className="filters" role="group" aria-label="Pantry items">
        {PANTRY.map(([label]) => (
          <button key={label} className="pill" aria-pressed={have.includes(label)} onClick={() => toggle(label)}>
            {label}
          </button>
        ))}
      </div>
      {have.length === 0 ? (
        <p className="empty">Tap what you have and I'll show what you can bake.</p>
      ) : ranked.length === 0 ? (
        <p className="empty">No matches yet. Try adding more items.</p>
      ) : (
        <section className="grid">
          {ranked.map(({ r, missing }) => (
            <div key={r.id}>
              <RecipeCard r={r} cardProps={cardProps} />
              <p className="missing">
                {missing.length === 0
                  ? "You have everything! ✓"
                  : `Missing: ${missing.slice(0, 3).map((i) => cleanName(i.name)).join(", ")}${missing.length > 3 ? ` +${missing.length - 3} more` : ""}`}
              </p>
            </div>
          ))}
        </section>
      )}
    </>
  );
}

/* ---------- cook mode ---------- */
function Timer({ minutes }) {
  const [left, setLeft] = useState(minutes * 60);
  const [on, setOn] = useState(false);
  const end = useRef(0);

  useEffect(() => {
    if (!on) return undefined;
    const id = setInterval(() => setLeft(Math.max(0, Math.ceil((end.current - Date.now()) / 1000))), 500);
    return () => clearInterval(id);
  }, [on]);

  useEffect(() => {
    if (on && left === 0) {
      setOn(false);
      navigator.vibrate?.([300, 150, 300]);
      beep();
    }
  }, [on, left]);

  if (!minutes) return null;
  const start = () => { end.current = Date.now() + left * 1000; setOn(true); };
  const add = (m) => { setLeft(left + m * 60); end.current += m * 60000; };
  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="timer" role="timer" aria-live="off">
      <span className="timer-time">{mm}:{ss}</span>
      <div className="timer-btns">
        {on ? <button className="pill" onClick={() => setOn(false)}>Pause</button>
            : <button className="pill" onClick={start} disabled={left === 0}>Start</button>}
        <button className="pill" onClick={() => add(1)}>+1 min</button>
        <button className="pill" onClick={() => add(5)}>+5 min</button>
        <button className="pill" onClick={() => { setOn(false); setLeft(minutes * 60); }}>Reset</button>
      </div>
    </div>
  );
}

function CookMode({ recipe, fahrenheit, onExit }) {
  const [i, setI] = useState(0);
  const step = recipe.steps[i];
  const last = i === recipe.steps.length - 1;

  useEffect(() => {
    let lock;
    navigator.wakeLock?.request("screen").then((l) => { lock = l; }).catch(() => {});
    return () => { lock?.release?.(); };
  }, []);

  return (
    <div className="cook" role="dialog" aria-modal="true" aria-label={`Cook mode: ${recipe.name}`}>
      <button className="back" onClick={onExit}>✕ Exit</button>
      <p className="card-meta">{recipe.name} · Step {i + 1} of {recipe.steps.length}</p>
      <h2>{step.title}</h2>
      <p className="cook-text">{fmtTemp(step.text, fahrenheit)}</p>
      {(step.time || step.temp) && (
        <p className="chips">
          {step.time && <span className="chip">⏱ {step.time}</span>}
          {step.temp && <span className="chip">🌡 {fmtTemp(step.temp, fahrenheit)}</span>}
        </p>
      )}
      <Timer key={i} minutes={timerMinutes(step.time)} />
      <div className="cook-nav">
        <button className="back" onClick={() => setI(i - 1)} disabled={i === 0}>← Previous</button>
        <button className="surprise" onClick={() => (last ? onExit() : setI(i + 1))}>
          {last ? "Done 🎉" : "Next →"}
        </button>
      </div>
    </div>
  );
}

/* ---------- recipe page ---------- */
function RecipePage({ recipe, fahrenheit, saved, onSave, onBack }) {
  const [mult, setMult] = useState(1);
  const [done, setDone] = useState([]);
  const [cooking, setCooking] = useState(false);
  const [copied, setCopied] = useState(false);
  const tick = (n) => setDone(done.includes(n) ? done.filter((x) => x !== n) : [...done, n]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  };

  return (
    <article className="recipe">
      <div className="actions no-print">
        <button className="back" onClick={onBack}>← Back</button>
        <button className="pill" aria-pressed={saved} onClick={() => onSave(recipe.id)}>{saved ? "♥ Saved" : "♡ Save"}</button>
        <button className="pill" onClick={copy}>{copied ? "Link copied!" : "Copy link"}</button>
        <button className="pill" onClick={() => window.print()}>Print</button>
        <button className="surprise" onClick={() => setCooking(true)}>Start cooking</button>
      </div>

      <h2>{recipe.name}</h2>
      <p className="card-meta">{recipe.totalTime} · {recipe.yield}{mult !== 1 ? ` (×${mult})` : ""}</p>

      <section className="ingredients">
        <h3>What you need</h3>
        <div className="servings no-print" role="group" aria-label="Scale recipe">
          {[0.5, 1, 2, 3].map((m) => (
            <button key={m} className="pill" aria-pressed={mult === m} onClick={() => setMult(m)}>×{m}</button>
          ))}
        </div>
        <ul className="checklist">
          {recipe.ingredients.map((ing, n) => (
            <li key={n} className={done.includes(n) ? "done" : ""}>
              <label>
                <input type="checkbox" checked={done.includes(n)} onChange={() => tick(n)} />
                <span><strong>{Math.round(ing.grams * mult * 10) / 10} g</strong> {ing.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Steps</h3>
        <ol className="steps">
          {recipe.steps.map((s, idx) => (
            <li key={idx} className="step">
              <div className="step-text">
                <h4>{s.title}</h4>
                <p>{fmtTemp(s.text, fahrenheit)}</p>
                {(s.time || s.temp) && (
                  <p className="chips">
                    {s.time && <span className="chip">⏱ {s.time}</span>}
                    {s.temp && <span className="chip">🌡 {fmtTemp(s.temp, fahrenheit)}</span>}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {cooking && <CookMode recipe={recipe} fahrenheit={fahrenheit} onExit={() => setCooking(false)} />}
    </article>
  );
}

function About() {
  return (
    <article className="recipe">
      <h2>About Bake Inspo</h2>
      <p>Bake Inspo is a small, hand-built recipe collection for when you're out of ideas. Search by ingredient, browse by category, or tick what's in your kitchen.</p>
      <h3>How the recipes are written</h3>
      <p>Amounts are in grams because weighing is more accurate than cups. Recipes are written from standard baking ratios, and ovens and ingredients vary, so treat times and temperatures as a starting point and trust your eyes over the clock.</p>
      <h3>Found a mistake?</h3>
      <p><a href={FEEDBACK_URL} target="_blank" rel="noreferrer">Tell me what looks wrong</a> and I'll fix it.</p>
    </article>
  );
}

const Star = ({ className }) => (
  <svg className={`star ${className}`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C13 7 17 11 24 12 17 13 13 17 12 24 11 17 7 13 0 12 7 11 11 7 12 0Z" />
  </svg>
);

const CakeSlice = ({ className }) => (
  <svg className={`art ${className}`} viewBox="0 0 180 130" aria-hidden="true">
    <path d="M10 70Q20 20 95 14 165 10 172 60V110Q172 118 164 118H18Q10 118 10 110Z" fill="#f6c98d" />
    <path d="M10 70Q20 20 95 14 165 10 172 60 100 52 10 70Z" fill="#f0a24a" />
    <rect x="22" y="72" width="140" height="16" rx="8" fill="#4a2a1c" />
    <rect x="22" y="96" width="140" height="14" rx="7" fill="#4a2a1c" />
    <g fill="#4a2a1c">
      <circle cx="60" cy="34" r="5" /><circle cx="90" cy="28" r="5" />
      <circle cx="120" cy="32" r="5" /><circle cx="145" cy="44" r="5" />
    </g>
  </svg>
);

function Decor() {
  return (
    <div className="decor no-print" aria-hidden="true">
      <Star className="s1" /><Star className="s2" /><Star className="s3" />
      <Star className="s4" /><Star className="s5" />
      <span className="dot t1" /><span className="dot t2" /><span className="dot t3" />
      <svg className="art spatula" viewBox="0 0 320 110">
        <rect x="110" y="44" width="200" height="22" rx="11" fill="#c98a4b" />
        <rect x="8" y="10" width="150" height="90" rx="30" fill="#f1ddb0" />
        <rect x="26" y="28" width="98" height="54" rx="22" fill="#f8ebcb" />
      </svg>
      <svg className="art spoon" viewBox="0 0 440 120">
        <rect x="8" y="52" width="270" height="18" rx="9" fill="#c98a4b" />
        <ellipse cx="350" cy="61" rx="82" ry="52" fill="#d4924f" />
        <ellipse cx="350" cy="61" rx="62" ry="36" fill="#e0a465" />
      </svg>
      <CakeSlice className="cake-a" />
      <CakeSlice className="cake-b" />
    </div>
  );
}

/* ---------- app ---------- */
export default function App() {
  const [view, setView] = useState("browse");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(null);
  const [sub, setSub] = useState(null);
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState([]);
  const [have, setHave] = useState([]);
  const [saved, setSaved] = useStored("saved", []);
  const [fahrenheit, setFahrenheit] = useStored("fahrenheit", false);
  const [theme, setTheme] = useStored(
    "theme",
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { document.title = selected ? `${selected.name} · Bake Inspo` : "Bake Inspo"; }, [selected]);

  // Shareable links: #/r/<recipe-id>
  useEffect(() => {
    const read = () => {
      const m = /^#\/r\/(.+)$/.exec(location.hash);
      setSelected(m ? byId[decodeURIComponent(m[1])] ?? null : null);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const openRecipe = (r) => { location.hash = `/r/${r.id}`; };
  const closeRecipe = () => {
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    setSelected(null);
  };
  const toggleSave = (id) => setSaved(saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id]);
  const toggleFilter = (f) => setActive(active.includes(f) ? active.filter((x) => x !== f) : [...active, f]);
  const go = (v) => { setView(v); setCat(null); setSub(null); setQuery(""); closeRecipe(); };
  const goHome = () => { setCat(null); setSub(null); };

  const cardProps = { saved, onOpen: openRecipe, onSave: toggleSave };
  const searching = query.trim().length > 0;
  const results = useMemo(() => searchRecipes(query), [query]);

  let content;
  if (selected) {
    content = (
      <RecipePage
        key={selected.id}
        recipe={selected}
        fahrenheit={fahrenheit}
        saved={saved.includes(selected.id)}
        onSave={toggleSave}
        onBack={closeRecipe}
      />
    );
  } else if (view === "about") {
    content = <About />;
  } else if (view === "pantry") {
    content = <Pantry have={have} setHave={setHave} cardProps={cardProps} />;
  } else if (view === "saved") {
    const list = saved.map((id) => byId[id]).filter(Boolean);
    content = list.length === 0 ? (
      <p className="empty">Nothing saved yet. Tap the ♡ on any recipe.</p>
    ) : (
      <>
        <FilterBar active={active} onToggle={toggleFilter} />
        <RecipeGrid list={list} active={active} cardProps={cardProps} />
      </>
    );
  } else if (searching) {
    content = results.length > 0 ? (
      <>
        <FilterBar active={active} onToggle={toggleFilter} />
        <RecipeGrid list={results} active={active} cardProps={cardProps} />
      </>
    ) : (
      <p className="empty">Nothing matches "{query}" yet. Try a single ingredient like "chocolate" or "lemon".</p>
    );
  } else if (cat && sub) {
    content = (
      <>
        <Crumbs cat={cat} sub={sub} onHome={goHome} onCat={() => setSub(null)} />
        <FilterBar active={active} onToggle={toggleFilter} />
        <RecipeGrid list={sub.recipes} active={active} cardProps={cardProps} />
      </>
    );
  } else if (cat) {
    content = (
      <>
        <Crumbs cat={cat} sub={null} onHome={goHome} onCat={() => setSub(null)} />
        <section className="grid">
          {cat.subs.map((s) => (
            <Tile key={s.name} emoji={cat.emoji} name={s.name}
              meta={`${s.recipes.length} ${s.recipes.length === 1 ? "recipe" : "recipes"}`}
              onClick={() => setSub(s)} />
          ))}
        </section>
      </>
    );
  } else {
    content = (
      <section className="grid">
        {categories.map((c) => (
          <Tile key={c.id} emoji={c.emoji} name={c.name} meta={`${c.count} recipes`} onClick={() => setCat(c)} />
        ))}
      </section>
    );
  }

  return (
    <>
    <Decor />
    <main>
      <nav className="topbar no-print" aria-label="Main">
        <button aria-current={view === "browse" ? "page" : undefined} onClick={() => go("browse")}>Browse</button>
        <button aria-current={view === "pantry" ? "page" : undefined} onClick={() => go("pantry")}>Pantry</button>
        <button aria-current={view === "saved" ? "page" : undefined} onClick={() => go("saved")}>Saved{saved.length ? ` (${saved.length})` : ""}</button>
        <button aria-current={view === "about" ? "page" : undefined} onClick={() => go("about")}>About</button>
        <span className="spacer" />
        <button onClick={() => setFahrenheit(!fahrenheit)} aria-label="Toggle temperature unit">°{fahrenheit ? "F" : "C"}</button>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle dark mode">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </nav>

      <header className="hero no-print">
        <h1>Bake Inspo</h1>
        {view === "browse" && !selected && (
          <>
            <p>Out of ideas? Pick a category, or type what's in your pantry.</p>
            <input
              type="search"
              className="search"
              placeholder="Search by ingredient: lemon, banana, chocolate"
              value={query}
              onChange={(e) => { setQuery(e.target.value); if (selected) closeRecipe(); }}
              aria-label="Search recipes by ingredient"
            />
          </>
        )}
      </header>

      {content}
    </main>
    </>
  );
}
