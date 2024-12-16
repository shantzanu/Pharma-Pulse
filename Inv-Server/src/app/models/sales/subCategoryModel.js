import { Schema ,model} from "mongoose";
import { SUB_CATEGORY_SCHEMA as SCHEMA_CONST } from "../../mocks/schemaConst/salesSchemaConst.js";
import { paginatePlugin } from "../plugins/paginatePlugin.js";

const subCategorySchema = new Schema(
  { 
    categoryId: {
      type: Schema.Types.ObjectId,
      require:true, 
      ref: "category",
    },
    name: {
      type: String,
      require:true, 
    },
    image: {
      type: String,
      required: true, 
      get: (image) => {
        if (image && image.length > 0) {
          return `${process.env.DOMAIN_URL}productImages/${image}`
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
subCategorySchema.set('toJSON', { getters: true });

subCategorySchema.plugin(paginatePlugin);

export default  model(SCHEMA_CONST.COLLECTION_NAME, subCategorySchema);
