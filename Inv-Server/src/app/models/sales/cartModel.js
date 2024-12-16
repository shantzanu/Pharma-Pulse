import { Schema, model } from "mongoose";
import { CART_SCHEMA as SCHEMA_CONST } from "../../mocks/schemaConst/salesSchemaConst.js";
import { paginatePlugin } from "../plugins/paginatePlugin.js";

const cartSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "user",
    },
    productId: [
      {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    collection: SCHEMA_CONST.COLLECTION_NAME,
    versionKey: false,
  }
);

cartSchema.plugin(paginatePlugin);

export default model(SCHEMA_CONST.COLLECTION_NAME, cartSchema);
