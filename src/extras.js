/* ---------- dietary filters (based on ingredient names only) ---------- */
const lacks = (re) => (r) => !r.ingredients.some((i) => re.test(i.name));
export const DIET_FILTERS = {
  "Nut-free": lacks(/almond|pistachio|walnut|pecan|peanut|hazelnut|cashew|marzipan/i),
  "Egg-free": lacks(/\begg/i),
  "Dairy-free": lacks(/butter|milk|cream(?! of tartar)|cheese|yogurt|mascarpone/i),
  Vegetarian: lacks(/bacon|sausage|gelatin|lard|chicken|beef|pork/i),
};

/* ---------- grams <-> cups (approximate; first match wins) ---------- */
const UNITS = [
  [/egg wash/i, null],
  [/egg yolk/i, { each: 20 }],
  [/egg white/i, { each: 30 }],
  [/\beggs?\b/i, { each: 50 }],
  [/bread flour/i, { cup: 130 }],
  [/almond flour/i, { cup: 96 }],
  [/flour/i, { cup: 125 }],
  [/powdered sugar|icing sugar/i, { cup: 115 }],
  [/sugar/i, { cup: 200 }],
  [/peanut butter/i, { cup: 260 }],
  [/condensed milk/i, { cup: 300 }],
  [/milk|cream(?! cheese| of tartar)|water|espresso|coffee|mascarpone/i, { cup: 240 }],
  [/butter|cream cheese/i, { cup: 227 }],
  [/\boil\b/i, { cup: 220 }],
  [/cocoa/i, { cup: 85 }],
  [/oats/i, { cup: 90 }],
  [/shredded coconut/i, { cup: 85 }],
  [/chocolate|chips/i, { cup: 170 }],
  [/honey|molasses|syrup/i, { cup: 340 }],
  [/\bjam\b/i, { cup: 320 }],
  [/pistachio|walnut|pecan|almond/i, { cup: 120 }],
  [/blueberr|berries|raisin/i, { cup: 150 }],
  [/cornmeal/i, { cup: 150 }],
  [/cornstarch/i, { cup: 120 }],
  [/carrot/i, { cup: 110 }],
  [/parmesan|cheddar|gruy|cheese/i, { cup: 100 }],
  [/baking powder/i, { tsp: 4 }],
  [/baking soda/i, { tsp: 5 }],
  [/salt/i, { tsp: 6 }],
  [/yeast/i, { tsp: 3 }],
  [/cinnamon/i, { tsp: 2.5 }],
  [/vanilla/i, { tsp: 4 }],
  [/cream of tartar/i, { tsp: 3 }],
  [/ginger/i, { tsp: 2 }],
];
const FR = { 0.125: "⅛", 0.25: "¼", 0.375: "⅜", 0.5: "½", 0.625: "⅝", 0.75: "¾", 0.875: "⅞" };
function mixed(x, d) {
  const n = Math.round(x * d) / d;
  const whole = Math.floor(n);
  return `${whole || ""}${FR[Math.round((n - whole) * 1000) / 1000] ?? ""}` || "0";
}
export function fmtAmount(grams, name, cups) {
  const g = Math.round(grams * 10) / 10;
  const u = cups ? UNITS.find(([re]) => re.test(name))?.[1] : null;
  if (!u) return `${g} g`;
  if (u.each) {
    const n = mixed(grams / u.each, 2);
    return n === "0" ? `${g} g` : n;
  }
  const tsp = u.tsp ? grams / u.tsp : (grams / u.cup) * 48;
  let s;
  if (tsp < 3) s = `${mixed(tsp, 4)} tsp`;
  else if (tsp < 12) s = `${mixed(tsp / 3, 2)} tbsp`;
  else s = `${mixed(tsp / 48, 8)} ${tsp / 48 > 1.06 ? "cups" : "cup"}`;
  return s.startsWith("0") ? `${g} g` : `${s} (${g} g)`;
}

/* ---------- substitution notes ---------- */
const SUBS = [
  [/buttermilk/i, "No buttermilk? Mix 240 g milk with 1 tbsp lemon juice or white vinegar and rest 5 minutes."],
  [/heavy cream|whipping cream/i, "No heavy cream? For baking (not whipping), use about 3/4 milk plus 1/4 melted butter by volume."],
  [/sour cream/i, "No sour cream? Plain full-fat yogurt works 1:1."],
  [/brown sugar/i, "No brown sugar? Mix 200 g white sugar with 20 g molasses, or use white sugar for a slightly less chewy result."],
  [/powdered sugar/i, "No powdered sugar? Blitz granulated sugar with 1 tsp cornstarch per cup in a blender until fine."],
  [/baking powder/i, "No baking powder? Replace 1 tsp with 1/4 tsp baking soda plus 1/2 tsp cream of tartar."],
  [/instant yeast/i, "Only have active dry yeast? Use about 25% more and dissolve it in a little of the warm liquid first."],
  [/bread flour/i, "No bread flour? All-purpose flour works, but the crumb will be a little less chewy."],
  [/neutral oil/i, "Any mild oil works: canola, sunflower, or cooled melted coconut oil."],
  [/honey/i, "No honey? Maple syrup or light corn syrup swaps 1:1."],
  [/lemon juice/i, "No lemons? Lime juice swaps 1:1 in most bakes."],
  [/\beggs?\b/i, "Out of eggs? In muffins, loaves and cookies, 60 g applesauce or mashed banana can replace 1 egg (expect a denser crumb).",
    ["cake", "cookie", "muffin", "loaf", "cupcake", "brownie", "bar"]],
];
export const substitutionsFor = (r) =>
  SUBS.filter(([re, , tags]) => r.ingredients.some((i) => re.test(i.name)) && (!tags || tags.some((t) => r.tags.includes(t))))
    .map(([, note]) => note);

/* ---------- seasonal row ---------- */
const SEASONS = {
  Winter: ["holiday", "cinnamon", "ginger", "chocolate", "molasses"],
  Spring: ["lemon", "citrus", "tea time", "berries", "fruit"],
  Summer: ["berries", "fruit", "no bake", "light", "cream"],
  Autumn: ["autumn", "apple", "cinnamon", "pecan", "thanksgiving", "spice", "carrot"],
};
export function seasonName(d = new Date()) {
  const m = d.getMonth();
  return m === 11 || m <= 1 ? "Winter" : m <= 4 ? "Spring" : m <= 7 ? "Summer" : "Autumn";
}
export function seasonalRecipes(all, n = 4) {
  const keys = SEASONS[seasonName()];
  return all
    .map((r) => {
      const hay = [r.name, ...r.tags, ...r.ingredients.map((i) => i.name)].join(" ").toLowerCase();
      return { r, s: keys.filter((k) => hay.includes(k)).length };
    })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((x) => x.r);
}

/* ---------- "did you mean" suggestions ---------- */
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
export function suggestRecipes(query, all, limit = 4) {
  const words = query.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 2);
  if (words.length === 0) return [];
  return all
    .map((r) => {
      const vocab = [r.name, ...r.tags, ...r.ingredients.map((i) => i.name)]
        .join(" ").toLowerCase().split(/[^a-z]+/).filter(Boolean);
      const score = words.filter((w) => vocab.some((v) => v.startsWith(w.slice(0, 3)) || lev(v, w) <= (w.length > 5 ? 2 : 1))).length;
      return { r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.r);
}

/* ---------- shopping list ---------- */
export function combine(list) {
  const map = new Map();
  for (const r of list) {
    for (const i of r.ingredients) {
      if (/egg wash/i.test(i.name)) continue;
      const key = i.name.replace(/^[a-z ]+:\s*/i, "").replace(/\s*\(.*?\)/g, "").trim().toLowerCase();
      map.set(key, (map.get(key) || 0) + i.grams);
    }
  }
  return [...map].map(([name, grams]) => ({ name, grams })).sort((a, b) => a.name.localeCompare(b.name));
}

/* ---------- recipe of the day: same pick all day, changes at midnight ---------- */
export function dailyPick(all, d = new Date()) {
  const day = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  const sorted = [...all].sort((a, b) => a.id.localeCompare(b.id));
  return sorted[day % sorted.length];
}

/* ---------- "got leftovers?" chips: label + pattern matched against ingredient names ---------- */
export const LEFTOVERS = [
  ["Ripe bananas", /banana/i],
  ["Egg whites", /egg white/i],
  ["Egg yolks", /egg yolk/i],
  ["Buttermilk", /buttermilk/i],
  ["Heavy cream", /heavy cream|whipping cream/i],
  ["Sour cream or yogurt", /sour cream|yogurt/i],
  ["Stale bread", /stale bread/i],
  ["Apples", /apple/i],
];

/* ---------- "you might also like": shared tags, rare tags count for more ---------- */
export function related(r, all, n = 4) {
  const count = {};
  all.forEach((x) => x.tags.forEach((t) => { count[t] = (count[t] || 0) + 1; }));
  return all
    .filter((x) => x.id !== r.id)
    .map((x) => ({ x, s: x.tags.filter((t) => r.tags.includes(t)).reduce((a, t) => a + 1 / count[t], 0) }))
    .filter((o) => o.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((o) => o.x);
}
