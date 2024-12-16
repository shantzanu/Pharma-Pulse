import Cart from "../cartModel.js";

class CartRepository {
  constructor() {
    this.model = Cart;
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
}

export const CartInstance = new CartRepository();
