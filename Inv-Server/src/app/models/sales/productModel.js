import { Schema, model } from "mongoose";
import { PRODUCT_SCHEMA as SCHEMA_CONST } from "../../mocks/schemaConst/salesSchemaConst.js";
import { paginatePlugin } from "../plugins/paginatePlugin.js";
import { getAndSetIncNo } from "../../controllers/v1/auth/autoIncrement/autoIncrement.js";

const schema = new Schema(
  {
    productCode: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    // categoryId: {
    //   type: Schema.Types.ObjectId,
    //   require: true,
    //   ref: "category",
    // },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "sub_category",
    },
    // material: {
    //   type: String,
    //   required: true,
    //   enum: Object.values(SCHEMA_CONST.MATERIAL_TYPE_ENUM),
    // },
    weight: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    // size: {
    //   type: String,
    //   required: false,
    // },
    // price: {
    //   type: Number,
    //   required: false,
    // },
    images: {
      type: [String],
      required: false,
      get: (images) => {
        // Ensure images is an array and has elements before applying the transformation
        if (Array.isArray(images) && images.length > 0) {
          return images.map((image) => `${process.env.DOMAIN_URL}productImages/${image}`);
        }
        return images; // Return the original value if no transformation is needed
      },
      
    },
    variants: [
      {
        name: {
          type: String,
          require: true,
        },
        variantId: {
          type: Schema.Types.ObjectId,
          ref: "variant",
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
            qty: {
              type: Number,
              required: false,
            },
            price: {
              type: Number,
              required: false,
            },
          },
        ],
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

schema.set('toJSON', { getters: true });

schema.pre("save", async function (next) {
  const { isNew, isModified } = this;
  if (this.isNew) {
    this.productCode = await getAndSetIncNo(
      {
        collectionName: SCHEMA_CONST.COLLECTION_NAME,
        incPrefix: SCHEMA_CONST.INC_PREFIX,
      },
      true
    );
  }
  next();
});
schema.plugin(paginatePlugin);

export default model(SCHEMA_CONST.COLLECTION_NAME, schema);
