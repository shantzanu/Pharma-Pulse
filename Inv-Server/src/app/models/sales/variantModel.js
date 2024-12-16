import { Schema, model } from "mongoose";
import { VARIANT_SCHEMA as SCHEMA_CONST } from "../../mocks/schemaConst/salesSchemaConst.js";
import { paginatePlugin } from "../plugins/paginatePlugin.js";

const variantSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      required: false,
    },
    data: [
      {
        key: {
          type: String,
          required: false,
        },
        value: {
          type: String,
          required: false,
        },
      },
    ],
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

variantSchema.plugin(paginatePlugin);

export default model(SCHEMA_CONST.COLLECTION_NAME, variantSchema);
