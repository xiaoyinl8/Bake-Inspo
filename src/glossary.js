// Beginner-friendly baking terms. When a term first appears in a recipe's steps, it becomes a tappable word.
// Add your own: { key, re (what to look for in the step text), title (what to show), def (the explanation) }.
export const GLOSSARY = [
  { key: "cream", re: /\bcream(?:ing)? (?:the )?(?:butter|together)\b|\bcreamed\b/i, title: "Cream the butter",
    def: "Beat soft butter with sugar until pale and fluffy, usually 2 to 3 minutes. This traps tiny air bubbles that help the bake rise." },
  { key: "fold", re: /\bfold(?:ed|ing)?\b/i, title: "Fold",
    def: "Mix gently by scooping from the bottom of the bowl and turning the mixture over itself with a spatula, so the air you whipped in stays in." },
  { key: "soft-peaks", re: /\bsoft peaks?\b/i, title: "Soft peaks",
    def: "Whipped cream or egg whites that hold a shape, but the tip flops over when you lift the whisk out." },
  { key: "stiff-peaks", re: /\bstiff peaks?\b/i, title: "Stiff peaks",
    def: "Whipped cream or egg whites thick enough that the tip stands straight up when you lift the whisk out." },
  { key: "proof", re: /\bproof(?:ing)?\b/i, title: "Proof",
    def: "The final rise of shaped dough before baking. It is ready when it looks puffy and a gently pressed fingertip dent springs back slowly." },
  { key: "knead", re: /\bknead(?:ing)?\b/i, title: "Knead",
    def: "Work dough to build gluten, which gives bread its chew. In a stand mixer, the dough hook does this for you." },
  { key: "windowpane", re: /\bwindowpane\b/i, title: "Windowpane test",
    def: "Stretch a small piece of dough thin between your fingers. If it turns translucent without tearing, the gluten is ready." },
  { key: "bloom", re: /\bbloom(?:ed|ing)?\b/i, title: "Bloom",
    def: "Let gelatin soak in cold liquid until spongy (or yeast sit in warm liquid until foamy) before using it." },
  { key: "ganache", re: /\bganache\b/i, title: "Ganache",
    def: "Chocolate melted with hot cream until smooth and glossy. More chocolate makes it firmer, more cream makes it softer." },
  { key: "blind-bake", re: /\bblind[- ]bak(?:e|ed|ing)\b/i, title: "Blind bake",
    def: "Bake a pie or tart crust empty, lined with parchment and filled with baking weights or dried beans, so it stays crisp under a wet filling." },
  { key: "egg-wash", re: /\begg wash\b/i, title: "Egg wash",
    def: "A beaten egg, often with a splash of milk, brushed over dough for a shiny golden finish." },
  { key: "sift", re: /\bsift(?:ed|ing)?\b/i, title: "Sift",
    def: "Pass dry ingredients through a fine sieve to remove lumps and make them lighter." },
  { key: "score", re: /\bscor(?:e|ed|ing)\b/i, title: "Score",
    def: "Cut shallow slashes in the top of dough so it expands neatly in the oven instead of splitting randomly." },
  { key: "zest", re: /\bzest(?:ed)?\b/i, title: "Zest",
    def: "The thin, colored outer peel of citrus, grated finely. Avoid the white pith underneath, which is bitter." },
  { key: "streusel", re: /\bstreusel\b/i, title: "Streusel",
    def: "A crumbly topping of butter, sugar and flour that bakes into a crunchy layer." },
  { key: "tangzhong", re: /\btangzhong\b/i, title: "Tangzhong",
    def: "A paste of flour cooked with water or milk, mixed into bread dough to keep it extra soft and moist for days." },
  { key: "double-boiler", re: /\bbain-marie\b|\bdouble boiler\b/i, title: "Double boiler",
    def: "A heatproof bowl set over (not touching) a pan of barely simmering water, for gentle heat that won't scorch chocolate or custard." },
  { key: "ribbon", re: /\bribbon stage\b/i, title: "Ribbon stage",
    def: "Eggs and sugar beaten until thick enough that the batter falls from the whisk in a ribbon that sits on the surface for a few seconds." },
];

/**
 * Splits step text into plain pieces and glossary terms.
 * "seen" is a Set shared across a recipe's steps so each term is only highlighted the first time it appears.
 */
export function glossify(text, seen) {
  const parts = [];
  let rest = text;
  for (;;) {
    let best = null;
    for (const g of GLOSSARY) {
      if (seen.has(g.key)) continue;
      const m = g.re.exec(rest);
      if (m && (!best || m.index < best.m.index)) best = { g, m };
    }
    if (!best) break;
    const { g, m } = best;
    if (m.index > 0) parts.push({ text: rest.slice(0, m.index) });
    parts.push({ text: m[0], term: g });
    seen.add(g.key);
    rest = rest.slice(m.index + m[0].length);
  }
  if (rest) parts.push({ text: rest });
  return parts;
}
