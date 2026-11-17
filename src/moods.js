// "What's the vibe?" tiles on the landing page.
// Each mood has a label, an icon (see icons.jsx), and either a list of recipe ids or a test function.
// Ids that don't exist are ignored, so you can list recipes you plan to add later.
const minutes = (r) => {
  const h = /(\d+)\s*hour/.exec(r.totalTime);
  const m = /(\d+)\s*min/.exec(r.totalTime);
  return (h ? +h[1] * 60 : 0) + (m ? +m[1] : 0);
};
const ids = (list) => (r) => list.includes(r.id);

export const MOODS = [
  {
    label: "Impress guests", icon: "tart",
    test: ids([
      "tiramisu", "choux-cream-puffs", "fruit-tart-pastry-cream", "lemon-tart", "mini-pavlovas", "basque-cheesecake",
      "chocolate-lava-cakes", "hong-kong-egg-tarts", "easy-chocolate-croissants", "panna-cotta", "no-bake-cheesecake",
      "chocolate-mousse", "tomato-ricotta-galette", "apple-cinnamon-galette", "pecan-pie", "key-lime-pie", "pumpkin-pie",
    ]),
  },
  {
    label: "Rainy day", icon: "mug",
    test: ids([
      "cinnamon-rolls", "bread-pudding", "cinnamon-streusel-coffee-cake", "brown-butter-banana-bread", "apple-pie",
      "skillet-cornbread", "gingerbread-loaf", "bagels", "milk-bread", "focaccia", "soft-pretzels", "fudgy-brownies",
      "pumpkin-pie", "garlic-knots",
    ]),
  },
  {
    label: "Kid-friendly", icon: "cookie",
    test: ids([
      "chocolate-chip-cookies", "snickerdoodles", "sugar-cutout-cookies", "jam-thumbprint-cookies", "peanut-butter-cookies",
      "vanilla-cupcakes", "banana-oat-muffins", "double-chocolate-muffins", "apple-cinnamon-muffins", "fudgy-brownies",
      "crispy-rice-treats", "cookie-dough-bites", "no-bake-chocolate-oat-cookies", "icebox-cake", "soft-pretzels",
    ]),
  },
  { label: "Under 30 minutes", icon: "clock", test: (r) => minutes(r) > 0 && minutes(r) <= 30 },
  {
    label: "Gift-able", icon: "gift",
    test: ids([
      "pistachio-shortbread", "almond-biscotti", "chocolate-truffles", "jam-thumbprint-cookies", "sugar-cutout-cookies",
      "ginger-molasses-cookies", "gingerbread-loaf", "lemon-poppy-seed-loaf", "brown-butter-banana-bread",
      "vanilla-pound-cake", "cheese-straws", "matcha-madeleines", "almond-financiers", "cookie-dough-bites",
    ]),
  },
];
