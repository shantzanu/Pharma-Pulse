export const PRODUCT_SCHEMA = {
  STYLE_ENUM: Object.freeze({
    ENGAGEMENT: "Engagement",
    DAILY_WEAR: "Daily_Wear",
    COUPLE_RINGS: "Couple_Rings",
    COCKTAIL: "Cocktail",
    INFINITY: "Infinity",
    SOLITAIRE: "Solitaire",
    PLATINUM: "Platinum",
    BANDS: "Bands",
    PROMISE_RINGS: "Promise_Rings",
    ADJUSTABLE_RINGS: "Adjustable_Rings",
  }),
  MATERIAL_TYPE_ENUM: Object.freeze({
    GOLD: "Gold",
    PEARL: "Pearl",
    DIAMOND: "Diamond",
    NAVRATNA: "Navratna",
    PLATINUM: "Platinum",
    SILVER: "Silver",
    ROSE_GOLD: "Rose_Gold",
    WHITE_GOLD: "White_Gold",
    YELLOW_GOLD: "Yellow_Gold",
    GEM_STONE: "Gem_Stone",
  }),

  SHAPE_ENUM: Object.freeze({
    ROUND: "Round",
    OVAL: "Oval",
    PRINCESS: "Princess",
    CUSHION: "Cushion",
    EMERALD: "Emerald",
    HEART: "Heart",
    MARQUISE: "Marquise",
    PEAR: "Pear",
    RADIANT: "Radiant",
    ASSCHER: "Asscher",
  }),

  MATERIAL_ENUM: Object.freeze({
    GOLD: "Gold",
    PLATINUM: "Platinum",
    SILVER: "Silver",
    TITANIUM: "Titanium",
    COPPER: "Copper",
    STAINLESS_STEEL: "Stainless Steel",
    PALLADIUM: "Palladium",
    BRASS: "Brass",
  }),
  METAL_TYPE_ENUM: Object.freeze({
    GOLD: "Gold",
    PLATINUM: "Platinum",
    SILVER: "Silver",
    ROSE_GOLD: "Rose Gold",
    WHITE_GOLD: "White Gold",
    YELLOW_GOLD: "Yellow Gold",
  }),

  GEMSTONES_ENUM: Object.freeze({
    DIAMOND: "Diamond",
    RUBY: "Ruby",
    SAPPHIRE: "Sapphire",
    EMERALD: "Emerald",
    PEARL: "Pearl",
    TOPAZ: "Topaz",
    AMETHYST: "Amethyst",
    AQUAMARINE: "Aquamarine",
    OPAL: "Opal",
    CITRINE: "Citrine",
  }),
  SIZE_ENUM: Object.freeze({
    SMALL: "Small",
    MEDIUM: "Medium",
    LARGE: "Large",
    EXTRA_LARGE: "Extra Large",
    ADJUSTABLE: "Adjustable",
  }),
  COLOR_ENUM: Object.freeze({
    YELLOW_GOLD: "Yellow Gold",
    WHITE_GOLD: "White Gold",
    ROSE_GOLD: "Rose Gold",
    PLATINUM: "Platinum",
    SILVER: "Silver",
    BLACK: "Black",
    BLUE: "Blue",
    GREEN: "Green",
    RED: "Red",
    MULTICOLOR: "Multicolor",
  }),
  CUSTOMIZABLE_ENUM: Object.freeze({
    YES: true,
    NO: false,
  }),
  SHIPPING_DETAILS_ENUM: Object.freeze({
    FREE_SHIPPING: "Free shipping",
    SHIPS_3_5_BUSINESS_DAYS: "Ships within 3-5 business days",
    NEXT_DAY_DELIVERY: "Next-day delivery",
    INTERNATIONAL_SHIPPING: "International shipping available",
  }),
  RETURN_POLICY_ENUM: Object.freeze({
    THIRTY_DAY_RETURN_POLICY: "30-day return policy",
    NO_RETURNS: "No returns",
    THIRTY_DAY_RETURN_WITH_RESTOCKING_FEE:
      "30-day return policy with 10% restocking fee",
    FINAL_SALE: "Final sale",
  }),
  STATUS: Object.freeze({
    ACTIVE: "active",
    INACTIVE: "Inactive",
  }),

  COLLECTION_NAME: "product",
  INC_PREFIX: "P/",
};
export const REVIEW_SCHEMA = {
  RATING_ENUM: Object.freeze({
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  }),
  COLLECTION_NAME: "Review",
};
export const ORDER_SCHEMA = {
  STATUS: Object.freeze({
    PENDING: "Pending",
  }),
  COLLECTION_NAME: "Order",
};
export const CATEGORY_SCHEMA = {
  STATUS: Object.freeze({
    ACTIVE: "active",
    INACTIVE: "Inactive",
  }),
  TITLE_ENUM: Object.freeze({
    RINGS: "Rings",
    EARRINGS: "Earrings",
    NECKLACES: "Necklaces",
    BRACELETS: "Bracelets",
    // PENDANTS: "Pendants",
    SOLITAIRES: "Solitaires",
    MANGALSUTRA: "Mangalsutra",
    CHAINS: "Chains",
    BANGLES: "Bangles",
  }),

  MATERIAL_TYPE_ENUM: Object.freeze({
    GOLD: "Gold",
    PEARL: "Pearl",
    DIAMOND: "Diamond",
    NAVRATNA: "Navratna",
    PLATINUM: "Platinum",
    SILVER: "Silver",
    ROSE_GOLD: "Rose_Gold",
    WHITE_GOLD: "White_Gold",
    YELLOW_GOLD: "Yellow_Gold",
    GEM_STONE: "Gem_Stone",
  }),
  COLLECTION_NAME: "category",
};
export const SUB_CATEGORY_SCHEMA = {
  STATUS: Object.freeze({
    ACTIVE: "active",
    INACTIVE: "Inactive",
  }),

  COLLECTION_NAME: "sub_category",
};
export const CART_SCHEMA = {
  STATUS: Object.freeze({
    ACTIVE: "active",
    INACTIVE: "Inactive",
  }),

  COLLECTION_NAME: "cart",
};
export const VARIANT_SCHEMA = {
  STATUS: Object.freeze({
    ACTIVE: "active",
    INACTIVE: "Inactive",
  }),

  COLLECTION_NAME: "variant",
};
export const HOME_VISUAL_SCHEMA = {
  STATUS: Object.freeze({
    ACTIVE: "active",
    INACTIVE: "Inactive",
  }),
  TYPE: Object.freeze({
    SLIDER: "slider",
    FOCUS_IMAGE: "focus_image",
  }),

  COLLECTION_NAME: "home_visual",
};

export const CONSTANTS = {
  STATUS: Object.freeze({
    ACTIVE: "active",
    INACTIVE: "Inactive",
  }), 
};


