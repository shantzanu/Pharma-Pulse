import { Schema, model } from "mongoose";
import { HOME_VISUAL_SCHEMA as SCHEMA_CONST } from "../../mocks/schemaConst/salesSchemaConst.js";
import { paginatePlugin } from "../plugins/paginatePlugin.js";

const homeVisualSchema = new Schema(
  {
    
    type: {
      type: String,
      require: true,
      enum: Object.values(SCHEMA_CONST.TYPE),
    },
    image: {
      type: String,
      required: true,
      get: (image) => {
        if (image && image.length > 0) {
          return `${process.env.DOMAIN_URL}productImages/${image}`;
        }
        return null;
      },
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
homeVisualSchema.set("toJSON", { getters: true });

homeVisualSchema.plugin(paginatePlugin);

export default model(SCHEMA_CONST.COLLECTION_NAME, homeVisualSchema);
