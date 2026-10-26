// Which recipes appear under which category and subcategory.
// To add a recipe to the menu, add its "id" from the JSON to one of the lists below.
// A recipe can appear in more than one place. Any recipe not listed here is
// collected automatically under "More bakes", so nothing ever goes missing.
export const CATEGORIES = [
  {
    id: "cookies", name: "Cookies", emoji: "🍪",
    subs: [
      { name: "Chocolate & nutty", ids: ["chocolate-chip-cookies", "tahini-chocolate-cookies", "peanut-butter-cookies"] },
      { name: "Buttery & crisp", ids: ["pistachio-shortbread", "jam-thumbprint-cookies", "sugar-cutout-cookies", "almond-biscotti"] },
      { name: "Chewy & spiced", ids: ["snickerdoodles", "ginger-molasses-cookies", "oatmeal-raisin-cookies", "coconut-macaroons"] }
    ]
  },
  {
    id: "cakes", name: "Cakes & Muffins", emoji: "🎂",
    subs: [
      { name: "Layer & sheet cakes", ids: ["one-bowl-chocolate-cake", "carrot-cake", "cinnamon-streusel-coffee-cake"] },
      { name: "Loaf cakes", ids: ["vanilla-pound-cake", "lemon-olive-oil-cake"] },
      { name: "Cupcakes, muffins & individual", ids: ["vanilla-cupcakes", "lemon-blueberry-muffins", "chocolate-lava-cakes"] }
    ]
  },
  {
    id: "bars", name: "Bars & Brownies", emoji: "🍫",
    subs: [
      { name: "Brownies & blondies", ids: ["fudgy-brownies", "blondies"] },
      { name: "Fruity bars", ids: ["lemon-bars"] }
    ]
  },
  {
    id: "breads", name: "Breads & Rolls", emoji: "🍞",
    subs: [
      { name: "Sweet & enriched", ids: ["cinnamon-rolls", "brioche-loaf", "milk-bread", "pistachio-bread"] },
      { name: "Everyday & savory", ids: ["focaccia", "soft-dinner-rolls", "bagels", "soft-pretzels"] },
      { name: "No-yeast quick breads", ids: ["skillet-cornbread", "irish-soda-bread", "classic-scones", "brown-butter-banana-bread"] }
    ]
  },
  {
    id: "pies", name: "Pies & Tarts", emoji: "🥧",
    subs: [
      { name: "Pies", ids: ["apple-pie", "pecan-pie"] },
      { name: "Tarts & galettes", ids: ["lemon-tart", "fruit-tart-pastry-cream", "hong-kong-egg-tarts", "apple-cinnamon-galette"] }
    ]
  },
  {
    id: "pastries", name: "Pastries", emoji: "🥐",
    subs: [
      { name: "Puff pastry", ids: ["apple-turnovers", "easy-chocolate-croissants", "parmesan-palmiers"] },
      { name: "Choux", ids: ["choux-cream-puffs", "gougeres"] },
      { name: "French small bakes", ids: ["almond-financiers", "matcha-madeleines"] }
    ]
  },
  {
    id: "savory", name: "Savory Bakes", emoji: "🧀",
    subs: [
      { name: "Cheesy bites", ids: ["gougeres", "cheese-straws", "parmesan-palmiers"] },
      { name: "Hearty bakes", ids: ["quiche-lorraine", "sausage-rolls", "cheddar-biscuits"] }
    ]
  },
  {
    id: "desserts", name: "Desserts", emoji: "🍮",
    subs: [
      { name: "Creamy & chilled", ids: ["basque-cheesecake", "tiramisu"] },
      { name: "Light & airy", ids: ["mini-pavlovas", "coconut-macaroons"] }
    ]
  }
];
