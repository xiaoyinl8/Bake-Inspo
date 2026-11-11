// Extra facts about each recipe that don't live in the recipe JSON files.
// store = storing / make-ahead line.  pan = ["square" | "round" | "rect", [sizes in cm], optional count]
export const INFO = {
  "pistachio-bread": { store: "Keeps 3 days wrapped at room temperature; slices freeze well for 2 months. The first rise can happen overnight in the fridge." },
  "pistachio-shortbread": { store: "The dough log keeps 3 days in the fridge or 2 months in the freezer. Baked cookies keep 1 week airtight." },
  "lemon-blueberry-muffins": { store: "Keep 2 days airtight at room temperature; freeze for up to 2 months." },
  "chocolate-chip-cookies": { store: "The dough keeps up to 3 days chilled (the flavor improves) or freeze scooped balls for 3 months. Baked cookies keep 4 days airtight." },
  "cinnamon-rolls": { store: "Assemble the rolls the night before and chill; let them come to room temperature before baking. Best the day they're baked." },
  "almond-financiers": { store: "The batter keeps 2 days chilled. Baked cakes keep 3 days airtight." },
  "matcha-madeleines": { store: "The batter keeps up to 24 hours in the fridge. Best eaten the day they're baked." },
  "apple-cinnamon-galette": { store: "The dough keeps 2 days chilled. The baked galette keeps 2 days at room temperature, then in the fridge." },
  "brown-butter-banana-bread": { store: "Keeps 3 days wrapped at room temperature; slices freeze for 3 months." },
  "fudgy-brownies": { store: "Keep 4 days airtight; freeze cut squares for 2 months.", pan: ["square", [20]] },
  "coconut-macaroons": { store: "Keep 4 days airtight at room temperature." },
  "choux-cream-puffs": { store: "Unfilled shells keep 1 day airtight or freeze for 1 month (re-crisp in the oven). Fill just before serving; filled puffs belong in the fridge and should be eaten within a day." },
  "peanut-butter-cookies": { store: "Keep 5 days airtight; freeze for 3 months." },
  "vanilla-pound-cake": { store: "Keeps 4 days wrapped at room temperature and freezes well." },
  "classic-scones": { store: "Best the day they're baked. Freeze unbaked, cut scones and bake from frozen, adding 3 to 5 minutes." },
  "lemon-tart": { store: "Keeps 2 days refrigerated. The baked shell can be made a day ahead." },
  "brioche-loaf": { store: "Keeps 3 days wrapped; slices freeze for 2 months. The dough can chill overnight after its first rise." },
  "chocolate-lava-cakes": { store: "The filled ramekins can be chilled up to 1 day ahead. Bake straight from the fridge, adding a minute or two." },
  "oatmeal-raisin-cookies": { store: "Keep 5 days airtight; the dough freezes for 3 months." },
  "parmesan-palmiers": { store: "The sliced, unbaked pieces freeze for 1 month. Baked palmiers keep 2 days airtight." },
  "jam-thumbprint-cookies": { store: "Keep 4 days airtight; unfilled cookies freeze for 2 months." },
  "focaccia": { store: "Best the same day. Wrap leftovers for 2 days and refresh in a hot oven. The dough can rise overnight in the fridge.", pan: ["rect", [25, 35]] },
  "mini-pavlovas": { store: "The meringue shells keep up to 5 days in an airtight container in a dry place. Add cream and fruit just before serving." },
  "basque-cheesecake": { store: "Keeps 4 days covered in the fridge; best served cool or at room temperature.", pan: ["round", [18]] },
  "vanilla-cupcakes": { store: "Unfrosted cupcakes keep 2 days airtight. Frosted ones keep 2 days; use the fridge if your kitchen is warm." },
  "snickerdoodles": { store: "Keep 5 days airtight; the dough freezes for 3 months." },
  "sugar-cutout-cookies": { store: "Dough discs keep 3 days in the fridge or 2 months frozen. Undecorated cookies keep 1 week airtight." },
  "lemon-bars": { store: "Keep refrigerated for 4 days. Dust with powdered sugar just before serving.", pan: ["square", [20]] },
  "almond-biscotti": { store: "Keep 2 weeks airtight; they taste better after a day." },
  "ginger-molasses-cookies": { store: "Keep 5 days airtight; freeze the dough balls for 3 months." },
  "blondies": { store: "Keep 4 days airtight; freeze for 2 months.", pan: ["square", [20]] },
  "tahini-chocolate-cookies": { store: "Keep 5 days airtight; the dough freezes for 3 months." },
  "one-bowl-chocolate-cake": { store: "Wrapped, unfrosted layers keep 1 day at room temperature or 2 months frozen. The finished cake keeps 3 days.", pan: ["round", [20], 2] },
  "carrot-cake": { store: "Keep refrigerated (the frosting has cream cheese) for up to 4 days. Bring to room temperature before serving.", pan: ["square", [23]] },
  "lemon-olive-oil-cake": { store: "Keeps 3 days wrapped at room temperature and is even better on day two.", pan: ["round", [20]] },
  "cinnamon-streusel-coffee-cake": { store: "Keeps 2 days covered at room temperature; warm slices briefly before serving.", pan: ["square", [23]] },
  "tiramisu": { store: "Needs at least 6 hours in the fridge and keeps 2 days refrigerated. Don't freeze it." },
  "milk-bread": { store: "Keeps 3 to 4 days wrapped; slices freeze well for 2 months." },
  "soft-dinner-rolls": { store: "Best the day they're baked. Freeze for 2 months and reheat wrapped in foil." },
  "soft-pretzels": { store: "Best within a few hours. Freeze baked pretzels and reheat in the oven." },
  "bagels": { store: "Keep 2 days in a bag; slice and freeze for 2 months, then toast." },
  "skillet-cornbread": { store: "Keeps 2 days covered at room temperature; reheat wedges briefly." },
  "irish-soda-bread": { store: "Best the day it's baked; keeps 2 days wrapped." },
  "apple-pie": { store: "Keeps 2 days at room temperature, then up to 4 days in the fridge." },
  "pecan-pie": { store: "Keep refrigerated and covered for 4 days; it also freezes well." },
  "hong-kong-egg-tarts": { store: "Best the day they're baked. Refrigerate up to 2 days and warm briefly before serving." },
  "apple-turnovers": { store: "Best the day they're baked; reheat in the oven to re-crisp. The filling keeps 3 days chilled." },
  "easy-chocolate-croissants": { store: "Best the day they're baked. The shaped pastries can chill for a few hours before baking." },
  "fruit-tart-pastry-cream": { store: "Keep refrigerated and eat within 2 days. Assemble no more than a few hours ahead so the shell stays crisp." },
  "quiche-lorraine": { store: "Keeps 3 days refrigerated; reheat slices in the oven, not the microwave, to keep the crust crisp." },
  "gougeres": { store: "Baked gougères keep 1 day. Freeze unbaked mounds and bake from frozen, adding a few minutes." },
  "sausage-rolls": { store: "Keep 3 days refrigerated. Freeze unbaked rolls for 1 month and bake from frozen, adding about 5 minutes." },
  "cheddar-biscuits": { store: "Best warm and the same day; freeze baked biscuits for 1 month." },
  "cheese-straws": { store: "Keep 3 days airtight; re-crisp in a warm oven if needed." },
  "bread-pudding": { store: "Keeps 3 days covered in the fridge; reheat slices in a warm oven.", pan: ["square", [23]] },
  "banana-oat-muffins": { store: "Keep 2 days airtight at room temperature; freeze for up to 2 months." },
};

// Recipes that really need just one mixing bowl, and ones baked in a loaf pan
export const ONE_BOWL = new Set([
  "blondies", "peanut-butter-cookies", "irish-soda-bread", "one-bowl-chocolate-cake",
  "chocolate-chip-cookies", "oatmeal-raisin-cookies", "ginger-molasses-cookies", "tahini-chocolate-cookies",
  "sugar-cutout-cookies", "jam-thumbprint-cookies", "almond-biscotti", "pistachio-shortbread",
  "soft-dinner-rolls", "bagels", "banana-oat-muffins",
]);
export const LOAF_PAN = new Set([
  "pistachio-bread", "brioche-loaf", "brown-butter-banana-bread", "vanilla-pound-cake", "milk-bread",
]);

// Worked out from the step text, so new recipes are picked up automatically
export const isNoMixer = (r) => !r.steps.some((s) => /mixer|paddle|dough hook|whisk attachment/i.test(s.text));
export const isNoOven = (r) => !r.steps.some((s) => /\b(bake|baking|oven)\b/i.test(`${s.title} ${s.text}`));

const PROJECT_TAGS = ["impressive", "choux", "enriched", "laminated", "tangzhong"];
export function levelOf(r) {
  if (r.tags.includes("beginner")) return "Beginner";
  const hours = /(\d+)\s*hour/.exec(r.totalTime);
  if (PROJECT_TAGS.some((t) => r.tags.includes(t)) || (hours && +hours[1] >= 3)) return "Project";
  return "Intermediate";
}

/* ---------- pans ---------- */
const AREA = {
  square: ([s]) => s * s,
  round: ([d]) => Math.PI * (d / 2) ** 2,
  rect: ([w, h]) => w * h,
};
const LABEL = {
  square: ([s]) => `${s} cm square`,
  round: ([d]) => `${d} cm round`,
  rect: ([w, h]) => `${w} × ${h} cm`,
};
export const panOf = (r) => {
  const p = INFO[r.id]?.pan;
  return p ? { kind: p[0], dims: p[1], count: p[2] || 1 } : null;
};
export const panArea = (p) => AREA[p.kind](p.dims) * p.count;
export const panLabel = (p) => (p.count > 1 ? `${p.count} × ${LABEL[p.kind](p.dims)}` : LABEL[p.kind](p.dims)) + " pan";
export const PANS = [
  ["18 cm square", "square", [18]], ["20 cm square", "square", [20]], ["23 cm square", "square", [23]],
  ["18 cm round", "round", [18]], ["20 cm round", "round", [20]], ["23 cm round", "round", [23]], ["25 cm round", "round", [25]],
  ["23 × 33 cm (9 × 13 in)", "rect", [23, 33]], ["25 × 35 cm tray", "rect", [25, 35]],
].map(([label, kind, dims]) => ({ label, area: AREA[kind](dims) }));
