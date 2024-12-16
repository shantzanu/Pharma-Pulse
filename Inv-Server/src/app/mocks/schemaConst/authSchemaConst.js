export const USER_SCHEMA = {
  GENDERS_ENUM: Object.freeze({
    MALE: "Male",
    FEMALE: "Female",
    OTHERS: "Others",
  }),
  STATUS_ENUM: Object.freeze({
    ACTIVE: "Active",
    INACTIVE: "Inactive",
  }),
  ROLE_ENUM: Object.freeze({
    ADMIN: "ADMIN",
    SUPER_ADMIN: "SUPER_ADMIN",
    CUSTOMER: "CUSTOMER",
  }),
  COLLECTION_NAME: "user",
};
export const AUTO_INCREMENT_SCHEMA = {
  COLLECTION_NAME: "AutoIncrement",
};

export const ROLE_SCHEMA = {
  ROLES_ENUM: Object.freeze({
    ADMIN: "Admin",
    SUPER_ADMIN: "Super Admin",
  }),
  STATUS_ENUM: Object.freeze({
    ACTIVE: "Active",
    INACTIVE: "Inactive",
  }),
  COLLECTION_NAME: "Role",
};
