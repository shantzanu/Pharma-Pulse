export const INVOICE_SCHEMA = {
  STATUS: Object.freeze({
    ACTIVE: "active",
    INACTIVE: "Inactive",
  }),

  COLLECTION_NAME: "invoice",
  INC_PREFIX: "INV/",
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
export const PURCHASE_BILL_SCHEMA = {
  STATUS: Object.freeze({
    ACTIVE: "active",
    INACTIVE: "Inactive",
  }),

  COLLECTION_NAME: "purchase_bill",
};
export const CART_SCHEMA = {
  STATUS: Object.freeze({
    ACTIVE: "active",
    INACTIVE: "Inactive",
  }),

  COLLECTION_NAME: "cart",
};
export const ITEM_SCHEMA = {
  STATUS: Object.freeze({
    ACTIVE: "active",
    INACTIVE: "Inactive",
  }),

  COLLECTION_NAME: "item",
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


