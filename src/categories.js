// The menu is a tree: big groups -> types -> niche groups -> recipes.
// A node has either "children" (more choices) or "ids" (recipe ids from your JSON).
// Each recipe should appear once. If an id is listed twice, only its first spot counts.
export const TREE = [
  {
    name: "Sweet", emoji: "🍰",
    children: [
      {
        name: "Cookies", emoji: "🍪",
        children: [
          { name: "Soft & chewy", ids: ["chocolate-chip-cookies", "snickerdoodles", "oatmeal-raisin-cookies", "ginger-molasses-cookies", "tahini-chocolate-cookies"] },
          { name: "Buttery & crisp", ids: ["pistachio-shortbread", "jam-thumbprint-cookies", "sugar-cutout-cookies", "almond-biscotti"] },
          { name: "Quick & few ingredients", ids: ["coconut-macaroons", "peanut-butter-cookies"] }
        ]
      },
      { name: "Brownies & Bars", emoji: "🍫", ids: ["fudgy-brownies", "blondies", "lemon-bars"] },
      {
        name: "Cakes & Cupcakes", emoji: "🎂",
        children: [
          { name: "Layer & sheet cakes", ids: ["one-bowl-chocolate-cake", "carrot-cake", "cinnamon-streusel-coffee-cake"] },
          { name: "Loaf cakes", ids: ["vanilla-pound-cake", "lemon-olive-oil-cake", "brown-butter-banana-bread"] },
          { name: "Cupcakes & muffins", ids: ["vanilla-cupcakes", "lemon-blueberry-muffins"] },
          { name: "Small & individual cakes", ids: ["chocolate-lava-cakes", "almond-financiers", "matcha-madeleines"] }
        ]
      },
      { name: "Sweet Breads & Rolls", emoji: "🌀", ids: ["cinnamon-rolls", "brioche-loaf", "milk-bread", "classic-scones"] },
      {
        name: "Pies & Tarts", emoji: "🥧",
        children: [
          { name: "Pies", ids: ["apple-pie", "pecan-pie"] },
          { name: "Tarts & galettes", ids: ["lemon-tart", "fruit-tart-pastry-cream", "hong-kong-egg-tarts", "apple-cinnamon-galette"] }
        ]
      },
      { name: "Pastries", emoji: "🥐", ids: ["apple-turnovers", "easy-chocolate-croissants", "choux-cream-puffs"] },
      { name: "Creamy & Chilled", emoji: "🍮", ids: ["basque-cheesecake", "tiramisu", "mini-pavlovas"] }
    ]
  },
  {
    name: "Savory", emoji: "🧀",
    children: [
      {
        name: "Breads & Rolls", emoji: "🍞",
        children: [
          { name: "Everyday loaves & rolls", ids: ["focaccia", "soft-dinner-rolls", "pistachio-bread"] },
          { name: "Chewy & boiled", ids: ["bagels", "soft-pretzels"] },
          { name: "Quick breads (no yeast)", ids: ["skillet-cornbread", "irish-soda-bread", "cheddar-biscuits"] }
        ]
      },
      { name: "Pastry & Party Bites", emoji: "🥨", ids: ["quiche-lorraine", "parmesan-palmiers", "cheese-straws", "sausage-rolls", "gougeres"] }
    ]
  }
];
