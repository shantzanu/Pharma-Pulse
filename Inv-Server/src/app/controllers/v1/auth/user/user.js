import { hash, genSaltSync, compare } from "bcrypt";
import MESSAGES from "../../../../helpers/messages.js";
import handleAsync from "../../../../utilities/handleAsync.js";
import { UserInstance } from "../../../../models/auth/repository/userRepository.js";
export const getAll = handleAsync(async (req, res) => {
  const project = {
    status: 1,
    mobile: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    gender: 1,
    role:1
  };
  const pipeline = [];
  let rows = await UserInstance.getAllPaginate({
    pipeline,
    project,
    queryParams: req.query,
  });
  return res.success(rows);
});

// Create user
export const create = handleAsync(async (req, res) => {
  let userExists = await UserInstance.findOneDoc(
    {
      email: req.body.email.toLowerCase(),
    },
    { _id: 1 }
  );
  if (userExists) {
    let error = MESSAGES.apiErrorStrings.DATA_ALREADY_EXISTS("User");
    return res.preconditionFailed(error);
  }
  const userObj = await UserInstance.createDoc(req.body);
  if (userObj) {
    res.success({ message: MESSAGES.apiSuccessStrings.CREATE("User") });
  }
});

// Update user
export const update = handleAsync(async (req, res) => {
  let existing = await UserInstance.getDocById(req.params.id);
  if (!existing)
    res.preconditionFailed(MESSAGES.apiErrorStrings.INVALID_REQUEST);
  let user = await UserInstance.updateDoc(existing, req.body);
  if (!user) {
    return res.preconditionFailed(errors);
  }
  return res.success({
    message: MESSAGES.apiSuccessStrings.UPDATE("User"),
  });
});

// Get user by ID
export const getById = handleAsync(async (req, res) => {
  let existing = await UserInstance.getDocById(req.params.id);
  if (!existing) {
    return res.unprocessableEntity(errors);
  }
  return res.success(existing);
});

// Delete user by ID
export const deleteById = handleAsync(async (req, res) => {
  const deleteItem = await UserInstance.deleteDoc(req.params.id);
  if (deleteItem) {
    return res.success({ message: MESSAGES.apiSuccessStrings.DELETE });
  }
});

// Login user
export const login = handleAsync(async (req, res) => {
  let existingUser = await UserInstance.findOneDoc({
    email: req.body.email,
  });
  if (!existingUser) {
    let errors = MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("User");
    return res.preconditionFailed(errors);
  }
  console.log(
    req.body.password,
    existingUser,
    await existingUser.matchPassword(req.body.password, existingUser.password)
  );

  if (
    !(await existingUser.matchPassword(
      req.body.password,
      existingUser.password
    ))
  ) {
    let errors = MESSAGES.apiErrorStrings.INCORRECT_PASSWORD;
    return res.preconditionFailed(errors);
  }

  return res.success({
    _id: existingUser._id,
    token: await UserInstance.genToken(),
    email: existingUser.email,
    role: existingUser.role,
    message: MESSAGES.apiSuccessStrings.LOGIN("User"),
  });
});
