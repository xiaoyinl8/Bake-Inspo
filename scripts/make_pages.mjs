// Runs after "vite build". Creates a small share page for every recipe at dist/r/<id>/index.html.
// Each page has its own title, description and Open Graph tags (so links look good when shared), plain-text
// ingredients and steps for search engines, and then sends the visitor into the app.
// It also writes dist/sitemap.xml and dist/robots.txt when SITE_URL is set (the deploy workflow sets it).
import fs from "node:fs";
import path from "node:path";

const SITE = (process.env.SITE_URL || "").replace(/\/?$/, "/"); // e.g. https://name.github.io/repo/
const hasSite = Boolean(process.env.SITE_URL);
const dataDir = "src/data";
const dist = "dist";

if (!fs.existsSync(dist)) {
  console.error("dist/ not found. Run `vite build` first.");
  process.exit(1);
}

const recipes = fs
  .readdirSync(dataDir)
  .filter((f) => f.endsWith(".json"))
  .sort()
  .flatMap((f) => JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8")));

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// "about 1 hour 15 minutes" -> "PT1H15M"
function isoDuration(t) {
  const h = /(\d+)\s*hour/.exec(t);
  const m = /(\d+)\s*min/.exec(t);
  if (!h && !m) return undefined;
  return `PT${h ? `${h[1]}H` : ""}${m ? `${m[1]}M` : ""}`;
}

for (const r of recipes) {
  const url = hasSite ? `${SITE}r/${r.id}/` : null;
  const description = `${r.name}: a gram-based recipe with step-by-step instructions. Makes ${r.yield}, takes ${r.totalTime}.`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: r.name,
    description,
    recipeYield: r.yield,
    totalTime: isoDuration(r.totalTime),
    keywords: r.tags.join(", "),
    recipeIngredient: r.ingredients.map((i) => `${i.grams} g ${i.name}`),
    recipeInstructions: r.steps.map((s) => ({ "@type": "HowToStep", name: s.title, text: s.text })),
  };
  const ldJson = JSON.stringify(ld).replace(/</g, "\\u003c");
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(r.name)} · Bake Inspo</title>
<meta name="description" content="${esc(description)}">
${url ? `<link rel="canonical" href="${esc(url)}">\n<meta property="og:url" content="${esc(url)}">` : ""}
<meta property="og:type" content="article">
<meta property="og:site_name" content="Bake Inspo">
<meta property="og:title" content="${esc(r.name)} · Bake Inspo">
<meta property="og:description" content="${esc(description)}">
<meta name="twitter:card" content="summary">
<script type="application/ld+json">${ldJson}</script>
<script>location.replace("../../#/r/${encodeURIComponent(r.id)}");</script>
</head>
<body>
<h1>${esc(r.name)}</h1>
<p>${esc(r.yield)} · ${esc(r.totalTime)}</p>
<h2>What you need</h2>
<ul>${r.ingredients.map((i) => `<li>${i.grams} g ${esc(i.name)}</li>`).join("")}</ul>
<h2>Steps</h2>
<ol>${r.steps.map((s) => `<li><strong>${esc(s.title)}.</strong> ${esc(s.text)}</li>`).join("")}</ol>
<p><a href="../../#/r/${encodeURIComponent(r.id)}">Open in Bake Inspo</a></p>
</body>
</html>
`;
  const dir = path.join(dist, "r", r.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

if (hasSite) {
  const urls = [SITE, ...recipes.map((r) => `${SITE}r/${r.id}/`)];
  fs.writeFileSync(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${esc(u)}</loc></url>`)
      .join("\n")}\n</urlset>\n`
  );
  fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE}sitemap.xml\n`);
}

console.log(`Share pages: ${recipes.length} recipes${hasSite ? " + sitemap.xml + robots.txt" : " (set SITE_URL to also write sitemap.xml)"}`);
