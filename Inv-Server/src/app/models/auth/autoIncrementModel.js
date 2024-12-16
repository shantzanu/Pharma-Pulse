import { Schema, model } from "mongoose";
import { paginatePlugin } from "../plugins/paginatePlugin.js";
import { AUTO_INCREMENT_SCHEMA as SCHEMA_CONST } from "../../mocks/schemaConst/authSchemaConst.js";

const schema = new Schema({
  collectionName: {
    type: String,
    required: true,
    index: { unique: true },
  },
  incPrefix: {
    type: String,
    required: false,
  },
  digit: {
    type: Number,
    required: false,
    default: 4,
  },
  autoIncNo: {
    type: Number,
    default: 1,
  },
});

schema.plugin(paginatePlugin);
const AutoIncrement = model(SCHEMA_CONST.COLLECTION_NAME, schema);
export default AutoIncrement;
