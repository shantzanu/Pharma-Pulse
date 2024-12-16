import { getMatchData } from "../../helpers/utility.js";

export function paginatePlugin(schema) {
  schema.statics.paginate = async function ({
    pipeline = [],
    project = {},
    queryParams,
  }) {
    try {
      const {
        search = null,
        excel = "false",
        page = 1,
        pageSize = 10,
        column = "createdAt",
        direction = -1,
      } = queryParams;
      let match = await getMatchData(project, search);
      let skip = Math.max(0, page - 1) * pageSize;
      let pagination = [];
      if (excel == "false") {
        pagination = [{ $skip: +skip }, { $limit: +pageSize }];
      }
      let rows = await this.aggregate([
        ...pipeline,
        { $project: project },
        { $match: match },
        { $sort: { [column]: +direction } },
        {
          $facet: {
            metadata: [{ $count: "total" }],
            data: pagination,
          },
        },
      ]);
      return {
        rows: rows[0]?.data || [],
        count: rows[0]?.metadata?.[0]?.total || 0,
      };
    } catch (e) {
      console.error("paginatePlugin", e);
    }
  };
}
