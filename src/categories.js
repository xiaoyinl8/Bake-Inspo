// The menu is a tree: big groups -> types -> niche groups -> recipes.
// A node has either "children" (more choices) or "ids" (recipe ids from your JSON).
// "icon" picks the little drawing on the tile (cookie, brownie, cake, cupcake, loaf, roll,
// pie, tart, croissant, dessert, cheese, pretzel, sparkle). Children inherit their parent's icon.
// Each recipe should appear once. If an id is listed twice, only its first spot counts.
export const TREE = [
  {
    name: "Sweet", emoji: "🍰", icon: "cake",
    children: [
      {
        name: "Cookies", emoji: "🍪", icon: "cookie",
        children: [
          { name: "Soft & chewy", ids: ["chocolate-chip-cookies", "snickerdoodles", "oatmeal-raisin-cookies", "ginger-molasses-cookies", "tahini-chocolate-cookies"] },
          { name: "Buttery & crisp", ids: ["pistachio-shortbread", "jam-thumbprint-cookies", "sugar-cutout-cookies", "almond-biscotti"] },
          { name: "Quick & few ingredients", ids: ["coconut-macaroons", "peanut-butter-cookies"] }
        ]
      },
      { name: "Brownies & Bars", emoji: "🍫", icon: "brownie", ids: ["fudgy-brownies", "blondies", "lemon-bars"] },
      {
        name: "Cakes & Cupcakes", emoji: "🎂", icon: "cake",
        children: [
          { name: "Layer & sheet cakes", ids: ["one-bowl-chocolate-cake", "carrot-cake", "cinnamon-streusel-coffee-cake"] },
          { name: "Loaf cakes", icon: "loaf", ids: ["vanilla-pound-cake", "lemon-olive-oil-cake", "brown-butter-banana-bread"] },
          { name: "Cupcakes & muffins", icon: "cupcake", ids: ["vanilla-cupcakes", "lemon-blueberry-muffins", "banana-oat-muffins"] },
          { name: "Small & individual cakes", ids: ["chocolate-lava-cakes", "almond-financiers", "matcha-madeleines"] }
        ]
      },
      { name: "Sweet Breads & Rolls", emoji: "🌀", icon: "roll", ids: ["cinnamon-rolls", "brioche-loaf", "milk-bread", "classic-scones", "bread-pudding"] },
      {
        name: "Pies & Tarts", emoji: "🥧", icon: "pie",
        children: [
          { name: "Pies", ids: ["apple-pie", "pecan-pie"] },
          { name: "Tarts & galettes", icon: "tart", ids: ["lemon-tart", "fruit-tart-pastry-cream", "hong-kong-egg-tarts", "apple-cinnamon-galette"] }
        ]
      },
      { name: "Pastries", emoji: "🥐", icon: "croissant", ids: ["apple-turnovers", "easy-chocolate-croissants", "choux-cream-puffs"] },
      { name: "Creamy & Chilled", emoji: "🍮", icon: "dessert", ids: ["basque-cheesecake", "tiramisu", "mini-pavlovas"] }
    ]
  },
  {
    name: "Savory", emoji: "🧀", icon: "cheese",
    children: [
      {
        name: "Breads & Rolls", emoji: "🍞", icon: "loaf",
        children: [
          { name: "Everyday loaves & rolls", ids: ["focaccia", "soft-dinner-rolls", "pistachio-bread"] },
          { name: "Chewy & boiled", ids: ["bagels", "soft-pretzels"] },
          { name: "Quick breads (no yeast)", ids: ["skillet-cornbread", "irish-soda-bread", "cheddar-biscuits"] }
        ]
      },
      { name: "Pastry & Party Bites", emoji: "🥨", icon: "pretzel", ids: ["quiche-lorraine", "parmesan-palmiers", "cheese-straws", "sausage-rolls", "gougeres"] }
    ]
  }
];
