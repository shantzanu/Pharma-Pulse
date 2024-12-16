import { Schema, model } from "mongoose";
import { CATEGORY_SCHEMA as SCHEMA_CONST } from "../../mocks/schemaConst/salesSchemaConst.js";
import { paginatePlugin } from "../plugins/paginatePlugin.js";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      enum: Object.values(SCHEMA_CONST.TITLE_ENUM),
    },
    // material: [
    //   {
    //     type: String,
    //     required: true,
    //     // enum: Object.values(SCHEMA_CONST.MATERIAL_TYPE_ENUM),
    //   },
    // ],
    image: {
      type: String,
      required: true,
      // get: function () {
      //   return this.image ? `${process.env.DOMAIN_URL}productImages/${this.image}` : null;
      // },
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

categorySchema.set('toJSON', { getters: true });


// categorySchema.virtual('imageUrl').get(function () {
//   if (this.image && this.image != 'undefined') {
//     return process.env.DOMAIN_URL + 'productImages/' + this.image;
//   }
// });

categorySchema.plugin(paginatePlugin);

export default model(SCHEMA_CONST.COLLECTION_NAME, categorySchema);
