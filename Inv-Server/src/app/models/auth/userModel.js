import { Schema, model } from "mongoose";
import { hashSync, genSaltSync, compare } from "bcrypt";
import { USER_SCHEMA as SCHEMA_CONST } from "../../mocks/schemaConst/authSchemaConst.js";
import { paginatePlugin } from "../plugins/paginatePlugin.js";
const userSchema = new Schema(
  {
    mobile: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
      enum: Object.values(SCHEMA_CONST.GENDERS_ENUM),
    },
    password: {
      type: String,
      required: true,
    },
    role: 
      {
      type: String,
        required: true,
      enum: Object.values(SCHEMA_CONST.ROLE_ENUM),
      },
    status: {
      type: String,
      required: false,
      enum: Object.values(SCHEMA_CONST.STATUS_ENUM),
    },
    // wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    // orders: [
    //   {
    //     jewelry: { type: Schema.Types.ObjectId, ref: "Product" },
    //     quantity: { type: Number, required: true },
    //     status: { type: String, default: "pending" },
    //     orderDate: { type: Date, default: Date.now },
    //   },
    // ],
    // reviews: [
    //   {
    //     jewelry: { type: Schema.Types.ObjectId, ref: "Product" },
    //     reviewText: { type: String },
    //     rating: { type: Number, min: 1, max: 5 },
    //     reviewDate: { type: Date, default: Date.now },
    //   },
    // ],
  },
  {
    timestamps: true,
    collection: SCHEMA_CONST.COLLECTION_NAME,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = genSaltSync(8);
    this.password = hashSync(this.password, salt);
  }
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
   
};

userSchema.plugin(paginatePlugin);
const User = model(SCHEMA_CONST.COLLECTION_NAME, userSchema);

export default User;
