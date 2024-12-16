import MESSAGES from "../../../../helpers/messages.js";
import { CONSTANTS } from "../../../../mocks/schemaConst/salesSchemaConst.js";
import { CategoryInstance } from "../../../../models/sales/repository/categoryRepository.js";
import { HomeVisualInstance } from "../../../../models/sales/repository/homeVisualRepository.js";

import handleAsync from "../../../../utilities/handleAsync.js";

export const getAllMasterData = handleAsync(async (req, res) => {
  let category = await CategoryInstance.getAllByAggregation([
    {
      $match: {
        status: CONSTANTS.STATUS.ACTIVE,
      },
    },
    {
      $lookup: {
        from: "sub_category",
        localField: "_id",
        foreignField: "categoryId",
        as: "subCategoryDetails",
        pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
              image: {
                $concat: [process.env.DOMAIN_URL, "productImages/", "$image"],
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        title: 1,
        image: 1,
        status: 1,
        subCategoryDetails: 1,
      },
    },
  ]);
  let homeVisuals = await HomeVisualInstance.getAllByAggregation([
    {
      $match: {
        status: CONSTANTS.STATUS.ACTIVE,
      },
    },
    {
      $project: {
        type: 1,
        image: {
          $concat: [process.env.DOMAIN_URL, "productImages/", "$image"],
        },
        status: 1,
      },
    },
    {
      $group: {
        _id: { type : "$type" },
        images: { $push: "$image" }, // Include all images in an array
        statuses: { $push: "$status" },
      }
    },
    {
      $project: {
        _id: 0,
        type: "$_id.type", // Move type from _id to top level
        images: 1,
        // statuses: 1,
      },
    }
  ]);
  return res.success({ category, homeVisuals });
});
