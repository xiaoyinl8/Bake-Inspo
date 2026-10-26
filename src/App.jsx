import { useMemo, useState } from "react";
import { CATEGORIES } from "./categories.js";

// Loads every .json file in src/data, so new recipe files need no code changes
const recipeFiles = import.meta.glob("./data/*.json", { eager: true });
const recipes = Object.values(recipeFiles).flatMap((m) => m.default);
const byId = Object.fromEntries(recipes.map((r) => [r.id, r]));

// Turn the id lists in categories.js into real recipe objects.
// Recipes that aren't listed anywhere are gathered under "More bakes".
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

// "Pistachios, butter" -> ["pistachio", "butter"] (plurals trimmed)
const tokenize = (q) =>
  q
    .toLowerCase()
    .split(/[,\s]+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => (t.length > 3 && t.endsWith("s") && !t.endsWith("ss") ? t.slice(0, -1) : t));

// Score = how many keywords appear in the recipe's name, tags or ingredients
function searchRecipes(query) {
  const words = tokenize(query);
  if (words.length === 0) return [];

  return recipes
    .map((r) => {
      const haystack = [r.name, ...r.tags, ...r.ingredients.map((i) => i.name)]
        .join(" ")
        .toLowerCase();
      const score = words.filter((w) => haystack.includes(w)).length;
      return { recipe: r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.recipe);
}

function StepImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div className="img-placeholder">image coming soon</div>;
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}

function Tile({ emoji, name, meta, onClick }) {
  return (
    <button className="card" onClick={onClick}>
      {emoji && <span className="card-emoji" aria-hidden="true">{emoji}</span>}
      <span className="card-name">{name}</span>
      {meta && <span className="card-meta">{meta}</span>}
    </button>
  );
}

function Crumbs({ cat, sub, onHome, onCat }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <button onClick={onHome}>All categories</button>
      <span aria-hidden="true">›</span>
      {sub ? <button onClick={onCat}>{cat.name}</button> : <strong>{cat.name}</strong>}
      {sub && (
        <>
          <span aria-hidden="true">›</span>
          <strong>{sub.name}</strong>
        </>
      )}
    </nav>
  );
}

function RecipeGrid({ list, onOpen }) {
  return (
    <section className="grid">
      {list.map((r) => (
        <Tile
          key={r.id}
          emoji={r.emoji}
          name={r.name}
          meta={`${r.totalTime} · ${r.yield}`}
          onClick={() => onOpen(r)}
        />
      ))}
    </section>
  );
}

function RecipePage({ recipe, onBack }) {
  return (
    <article className="recipe">
      <button className="back" onClick={onBack}>← Back</button>
      <h2>{recipe.name}</h2>
      <p className="card-meta">{recipe.totalTime} · {recipe.yield}</p>

      <section className="ingredients">
        <h3>What you need</h3>
        <ul>
          {recipe.ingredients.map((i) => (
            <li key={i.name}>
              <strong>{i.grams} g</strong> {i.name}
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
                <p>{s.text}</p>
                {(s.time || s.temp) && (
                  <p className="chips">
                    {s.time && <span className="chip">⏱ {s.time}</span>}
                    {s.temp && <span className="chip">🌡 {s.temp}</span>}
                  </p>
                )}
              </div>
              <StepImage
                src={s.image ?? `images/${recipe.id}/step${idx + 1}.png`}
                alt={`${recipe.name}: ${s.title}`}
              />
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(null);
  const [sub, setSub] = useState(null);
  const [selected, setSelected] = useState(null);

  const searching = query.trim().length > 0;
  const results = useMemo(() => searchRecipes(query), [query]);

  const goHome = () => { setCat(null); setSub(null); };

  let content;
  if (selected) {
    content = <RecipePage recipe={selected} onBack={() => setSelected(null)} />;
  } else if (searching) {
    content =
      results.length > 0 ? (
        <RecipeGrid list={results} onOpen={setSelected} />
      ) : (
        <p className="empty">
          Nothing matches "{query}" yet. Try a single ingredient like "chocolate" or "lemon".
        </p>
      );
  } else if (cat && sub) {
    content = (
      <>
        <Crumbs cat={cat} sub={sub} onHome={goHome} onCat={() => setSub(null)} />
        <RecipeGrid list={sub.recipes} onOpen={setSelected} />
      </>
    );
  } else if (cat) {
    content = (
      <>
        <Crumbs cat={cat} sub={null} onHome={goHome} onCat={() => setSub(null)} />
        <section className="grid">
          {cat.subs.map((s) => (
            <Tile
              key={s.name}
              emoji={cat.emoji}
              name={s.name}
              meta={`${s.recipes.length} ${s.recipes.length === 1 ? "recipe" : "recipes"}`}
              onClick={() => setSub(s)}
            />
          ))}
        </section>
      </>
    );
  } else {
    content = (
      <section className="grid">
        {categories.map((c) => (
          <Tile
            key={c.id}
            emoji={c.emoji}
            name={c.name}
            meta={`${c.count} recipes`}
            onClick={() => setCat(c)}
          />
        ))}
      </section>
    );
  }

  return (
    <main>
      <header className="hero">
        <h1>Bake Inspo</h1>
        <p>Out of ideas? Pick a category, or type what's in your pantry.</p>
        <input
          type="search"
          className="search"
          placeholder="Search by ingredient: lemon, banana, chocolate"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
          aria-label="Search recipes by ingredient"
        />
      </header>
      {content}
    </main>
  );
}
