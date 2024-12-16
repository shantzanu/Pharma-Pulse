import MESSAGES from "../../../../helpers/messages.js";
import { CartInstance } from "../../../../models/sales/repository/cartRepository.js";
import handleAsync from "../../../../utilities/handleAsync.js";

export const getAll = handleAsync(async (req, res) => {
  const project = {
    title: 1,
    material: 1,
    status: 1,
  };
  const pipeline = [];
  let rows = await CartInstance.getAllPaginate({
    pipeline,
    project,
    queryParams: req.query,
  });
  return res.send(rows);
});

// Create user
export const create = handleAsync(async (req, res) => {
  let exists = await CartInstance.findOneDoc(
    {
      title: req.body.title,
    },
    { _id: 1 }
  );
  if (exists){
    return  res.preconditionFailed(
      MESSAGES.apiErrorStrings.DATA_ALREADY_EXISTS("Tag")
    );}
  const userObj = await CartInstance.createDoc(req.body);
  if (userObj) {
    return res.send({ message: MESSAGES.apiSuccessStrings.CREATE("Tag") });
  }
});

// Update user
export const update = handleAsync(async (req, res) => {
  let exists = await CartInstance.getDocById(req.params.id);
  if (!exists) return res.preconditionFailed(MESSAGES.apiErrorStrings.INVALID_REQUEST);
  let updateData = await CartInstance.updateDoc(exists, req.body);
  if (!updateData) return res.preconditionFailed(errors);
  return res.send({
    message: MESSAGES.apiSuccessStrings.UPDATE("Tag"),
  });
});

// Get user by ID
export const getById = handleAsync(async (req, res) => {
  let exists = await CartInstance.getDocById(req.params.id);
  if (!exists) return res.unprocessableEntity(errors);
  return res.send(exists);
});

// Delete user by ID
export const deleteById = handleAsync(async (req, res) => {
  const deleteItem = await CartInstance.deleteDoc(req.params.id);
  if (deleteItem) return res.send({ message: MESSAGES.apiSuccessStrings.DELETE });
});
