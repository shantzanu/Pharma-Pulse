import MESSAGES from "../../../../helpers/messages.js";
import { ProductInstance } from "../../../../models/sales/repository/productRepository.js";
import { SubCategoryInstance } from "../../../../models/sales/repository/subCategoryRepository.js";
import { CategoryInstance } from "../../../../models/sales/repository/categoryRepository.js";
import { VariantInstance } from "../../../../models/sales/repository/variantRepository.js";

import handleAsync from "../../../../utilities/handleAsync.js";
import { fileURLToPath } from "url";
import fs from "fs";
import { dirname, join, resolve } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAll = handleAsync(async (req, res) => {
  const project = {
    productCode: 1,
    name: 1,
    weight: 1,
    description: 1,
    images: {
      $map: {
        input: "$images",
        as: "image",
        in: {
          $concat: [process.env.DOMAIN_URL, "productImages/", "$$image"],
        },
      },
    },
    subCategoryId: 1,
    variants: 1,
    subCategoryName: "$subCategoryDetails.name",
    status: 1,
  };
  const pipeline = [
    {
      $lookup: {
        from: "sub_category",
        localField: "subCategoryId",
        foreignField: "_id",
        as: "subCategoryDetails",
        pipeline: [{ $project: { _id: 1, name: 1 } }],
      },
    },

    {
      $unwind: "$subCategoryDetails",
    },
  ];
  let rows = await ProductInstance.getAllPaginate({
    pipeline,
    project,
    queryParams: req.query,
  });
  return res.success(rows);
});

// Create user
export const create = handleAsync(async (req, res) => {
  let createdObj = { ...req.body };

  let exists = await ProductInstance.findOneDoc(
    {
      name: req.body.name,
    },
    { _id: 1 }
  );
  if (exists) {
    return res.preconditionFailed(
      MESSAGES.apiErrorStrings.DATA_ALREADY_EXISTS("Product")
    );
  }

  if (req.files && req.files.length > 0) {
    createdObj = { ...req.body, images: req.files.map((x) => x.filename) };
  }
  const userObj = await ProductInstance.createDoc(createdObj);
  if (userObj) {
    return res.success({
      message: MESSAGES.apiSuccessStrings.CREATE("Product"),
    });
  }
});

// Update user
export const update = handleAsync(async (req, res) => {
  let createdObj = { ...req.body };
  let exists = await ProductInstance.getDocById(req.params.id);
  const rawImages = exists.get("images", null, { getters: false });
  if (!exists)
    return res.preconditionFailed(MESSAGES.apiErrorStrings.INVALID_REQUEST);

  // if (req.files && req.files.length > 0 && createdObj.imagesToDelete) {
  //   console.log("111");

  //   createdObj.imagesToDelete = JSON.parse(createdObj.imagesToDelete).map((x) =>
  //     x.replace("http://localhost:4500/", "")
  //   );
  //   createdObj.images = [
  //     rawImages.filter((image) => !createdObj.imagesToDelete.includes(image)),
  //     ...req.files.map((x) => x.path),
  //   ].flat();
  //   for (const ele of createdObj.imagesToDelete) {
  //     if (fs.existsSync(ele)) {
  //       fs.unlinkSync(ele);
  //     }
  //   }
  // } else if (req.files && req.files.length > 0) {
  //   console.log("222");

  //   createdObj = {
  //     ...createdObj,
  //     images: [
  //       ...rawImages, // Use the raw images from the database
  //       ...req.files.map((x) => x.path), // Add new file paths
  //     ],
  //   };
  // } else {
  //   if (createdObj.imagesToDelete) {
  //     console.log("333");

  //     createdObj.imagesToDelete = JSON.parse(createdObj.imagesToDelete).map(
  //       (x) => x.replace("http://localhost:4500/", "")
  //     );
  //     createdObj.images = rawImages.filter(
  //       (image) => !createdObj.imagesToDelete.includes(image)
  //     );
  //     for (const ele of createdObj.imagesToDelete) {
  //       if (fs.existsSync(ele)) {
  //         fs.unlinkSync(ele);
  //       }
  //     }
  //   }
  // }

  if (req.files && req.files.length > 0) {
    createdObj = {
      ...createdObj,
      images: [...rawImages, ...req.files.map((x) => x.filename)],
    };
  }

  let updateData = await ProductInstance.updateDoc(exists, createdObj);
  if (!updateData) return res.preconditionFailed(errors);
  return res.success({
    message: MESSAGES.apiSuccessStrings.UPDATE("Product"),
  });
});

// Get user by ID
export const getById = handleAsync(async (req, res) => {
  let exists = await ProductInstance.getDocById(req.params.id);
  if (!exists) return res.unprocessableEntity();
  return res.success(exists);
});

// Delete user by ID
export const deleteById = handleAsync(async (req, res) => {
  let exist = await ProductInstance.getDocById(req.params.id);
  let rawData = exist.toObject({ getters: false });

  for (const img of rawData.images) {
    let destination = resolve(
      __dirname,
      `../../../../../assets/productImages/${img}`
    );

    if (fs.existsSync(destination)) {
      fs.unlinkSync(destination);
    }
  }

  const deleteItem = await ProductInstance.deleteDoc(req.params.id);
  if (deleteItem)
    return res.success({ message: MESSAGES.apiSuccessStrings.DELETE });
});

export const MasterData = handleAsync(async (req, res) => {
  let subCategory = await SubCategoryInstance.findAllDoc(
    {},
    { _id: 1, name: 1 }
  );
  // let category = await CategoryInstance.findAllDoc({}, { _id: 1, title: 1 });
  let variant = await VariantInstance.findAllDoc({}, { _id: 1, name: 1 });

  return res.success({ subCategory, variant });
});

export const deleteProductImg = handleAsync(async (req, res) => {
  let createdObj = { ...req.body };
  let exists = await ProductInstance.getDocById(req.params.id);
  if (!exists)
    return res.preconditionFailed(MESSAGES.apiErrorStrings.INVALID_REQUEST);
  const rawImages = exists.get("images", null, { getters: false });

  if (createdObj.imagesToDelete && createdObj.imagesToDelete.length > 0) {
    createdObj.imagesToDelete = createdObj.imagesToDelete.map((x) =>
      x.replace(`${process.env.DOMAIN_URL}productImages/`, "")
    );

    createdObj.images = rawImages.filter(
      (image) => !createdObj.imagesToDelete.includes(image)
    );

    for (const ele of createdObj.imagesToDelete) {
      let destination = resolve(
        __dirname,
        `../../../../../assets/productImages/${ele}`
      );
      if (fs.existsSync(destination)) {
        fs.unlinkSync(destination);
      }
    }
  }
  // return
  // console.log("in deleteProductImg");

  await ProductInstance.findAndUpdateDoc(
    { _id: req.params.id },
    { $set: { images: createdObj.images } }
  );
  return res.success({
    message: MESSAGES.apiSuccessStrings.UPDATE("Images"),
  });
});

export const addProductVariant = handleAsync(async (req, res) => {
  let updateObj = { ...req.body };
  let exists = await ProductInstance.getDocById(req.params.id);
  if (!exists)
    return res.preconditionFailed(MESSAGES.apiErrorStrings.INVALID_REQUEST);

  let updateData = await ProductInstance.findByIdAndUpdateDoc(req.params.id, {
    $push: { variants: updateObj },
  });
  if (!updateData) return res.preconditionFailed();
  return res.success({
    message: MESSAGES.apiSuccessStrings.UPDATE("Product"),
  });
});

export const updateProductVariant = handleAsync(async (req, res) => {
  let updateObj = { ...req.body };
  console.log("updateObj", updateObj);

  let exists = await ProductInstance.getDocById(req.params.id);
  if (!exists)
    return res.preconditionFailed(MESSAGES.apiErrorStrings.INVALID_REQUEST);

  let updateData = await ProductInstance.findByIdAndUpdateDoc(
    req.params.id,
    {
      // $push: { variants: updateObj },
      $set: { "variants.$[i]": updateObj },
    },
    {
      arrayFilters: [
        {
          "i.variantId": updateObj.variantId,
        },
      ],
      new: true, // Return the updated document
    }
  );
  if (!updateData) return res.preconditionFailed();
  return res.success({
    message: MESSAGES.apiSuccessStrings.UPDATE("Product"),
  });
});
