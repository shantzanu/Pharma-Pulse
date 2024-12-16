import { Schema, model } from "mongoose";
import { INVOICE_SCHEMA as SCHEMA_CONST } from "../../mocks/schemaConst/salesSchemaConst.js";
import { paginatePlugin } from "../plugins/paginatePlugin.js";
import { getAndSetIncNo } from "../../controllers/v1/auth/autoIncrement/autoIncrement.js";
const schema = new Schema(
  {
    date: {
      type: String,
      required: false,
    },
    docName: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    contactNo: {
      type: Number,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    total: {
      type: Number,
      required: false,
    },
    data: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "item",
          required: true,
        },
        pack: {
          type: Number,
          required: true,
        },
        batchNo: {
          type: String,
          required: true,
        },
        shelf: {
          type: String,
          required: false,
        },
        expiry: {
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
        amount: {
          type: Number,
          required: true,
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

schema.set('toJSON', { getters: true });

// Pre-save hook to generate productCode
schema.pre("save", async function (next) {
  const { isNew } = this;
  if (isNew) {
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
