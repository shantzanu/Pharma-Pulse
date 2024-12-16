import { Schema ,model} from "mongoose";
import { PURCHASE_BILL_SCHEMA as SCHEMA_CONST } from "../../mocks/schemaConst/salesSchemaConst.js";
import { paginatePlugin } from "../plugins/paginatePlugin.js";

const schema = new Schema(
  {
    partyName: {
      type: String,
      required: true,
    },
    gstNo: {
      type: String,
      required: false,
    },
    billDate: {
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

schema.plugin(paginatePlugin);

export default  model(SCHEMA_CONST.COLLECTION_NAME, schema);
