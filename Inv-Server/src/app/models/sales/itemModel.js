import { Schema, model } from "mongoose";
import { ITEM_SCHEMA as SCHEMA_CONST } from "../../mocks/schemaConst/salesSchemaConst.js";
import { paginatePlugin } from "../plugins/paginatePlugin.js";

const itemSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      required: false,
    },
    pack: {
      type: Number,
      required: false,
    },
    batchNo: {
      type: String,
      required: false,
    },
    shelf: {
      type: String,
      required: false,
    },
    expiryDate: {
      type: String,
      required: false,
    },
    qty: {
      type: Number,
      required: false,
    },
    mrp: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      default: SCHEMA_CONST.STATUS.ACTIVE,
      enum: Object.values(SCHEMA_CONST.STATUS),
    },
  },
  {
    timestamps: true,
    collection: SCHEMA_CONST.COLLECTION_NAME,
    versionKey: false,
  }
);

itemSchema.plugin(paginatePlugin);

export default model(SCHEMA_CONST.COLLECTION_NAME, itemSchema);
