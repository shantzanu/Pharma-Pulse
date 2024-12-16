import User from "../userModel.js";
import jsonwebtoken from "jsonwebtoken";
import { compare } from "bcrypt";
import { CONSTANTS } from "../../../../configuration/config.js";

class UserRepository {
  constructor() {
    this.model = User;
  }
  async createDoc(data) {
    return this.model.create(data);
  }

  async findOneDoc(match, project = {}) {
    return this.model.findOne(match, project);
  }

  async findAndUpdateDoc(match, update, options = {}) {
    return this.model.updateOne(match, update, options);
  }

  async findByIdAndUpdateDoc(id, update, options = {}) {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  async getDocById(id, project = {}) {
    return this.model.findById(id, project);
  }

  async deleteDoc(id) {
    return this.model.deleteOne({ _id: id });
  }

  async getAllPaginate(pipeline) {
    return this.model.paginate(pipeline);
  }

  async updateDoc(existing, updateBody) {
    Object.assign(existing, updateBody);
    return existing.save();
  }

  async matchPassword(enteredPassword, currentPassword) {
      compare(enteredPassword, currentPassword,(err,val)=>{
        if(err){
          console.log('err--',err);
          
        }else{
          console.log('val--',val);
          return val

        }
      });
  }

  async genToken(email) {
    return jsonwebtoken.sign({ email: email }, CONSTANTS.jwtSecret, {
      algorithm: CONSTANTS.jwtAlgorithm,
      expiresIn: CONSTANTS.jwtTimeoutDuration,
    });
  }
}

export const UserInstance = new UserRepository();
