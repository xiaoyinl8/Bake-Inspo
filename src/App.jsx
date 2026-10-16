import { useMemo, useState } from "react";

// Loads every .json file in src/data, so new recipe files need no code changes
const recipeFiles = import.meta.glob("./data/*.json", { eager: true });
const recipes = Object.values(recipeFiles).flatMap((m) => m.default);

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
  if (words.length === 0) return recipes;

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

function RecipeCard({ recipe, onOpen }) {
  return (
    <button className="card" onClick={() => onOpen(recipe)}>
      <span className="card-emoji" aria-hidden="true">{recipe.emoji}</span>
      <span className="card-name">{recipe.name}</span>
      <span className="card-meta">{recipe.totalTime} · {recipe.yield}</span>
    </button>
  );
}

function RecipePage({ recipe, onBack }) {
  return (
    <article className="recipe">
      <button className="back" onClick={onBack}>Back to search</button>
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
  const [selected, setSelected] = useState(null);
  const results = useMemo(() => searchRecipes(query), [query]);

  return (
    <main>
      <header className="hero">
        <h1>Bake Inspo</h1>
        <p>Out of ideas? Type what's in your pantry and see what you can bake.</p>

        <input
          type="search"
          className="search"
          placeholder="Try: lemon, banana, no mixer, chocolate"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
          aria-label="Search recipes by ingredient"
        />
        
      </header>

      {selected ? (
        <RecipePage recipe={selected} onBack={() => setSelected(null)} />
      ) : results.length > 0 ? (
        <section className="grid">
          {results.map((r) => (
            <RecipeCard key={r.id} recipe={r} onOpen={setSelected} />
          ))}
        </section>
      ) : (
        <p className="empty">
          Nothing matches "{query}" yet. Try a single ingredient like "chocolate" or "lemon".
        </p>
      )}
    </main>
  );
}
