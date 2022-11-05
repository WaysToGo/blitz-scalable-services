import { resolver } from "blitz"
import db from "db"
import { groupBy, isEmpty } from "lodash"

export default resolver.pipe(resolver.authorize(), async ({ schema, dataSourceTypes }) => {
  const dataToFetchFromFieldId = {}
  let dataFromTables: any = []
  schema.sections.forEach((section) => {
    section.fields.forEach((field) => {
      if (dataSourceTypes.includes(field.type)) {
        if (!dataToFetchFromFieldId[field.table]) {
          dataToFetchFromFieldId[field.table] = []
        }
        dataToFetchFromFieldId[field.table].push(field.fieldid)
      }
    })
  })
  if (!isEmpty(dataToFetchFromFieldId)) {
    for (const key in dataToFetchFromFieldId) {
      //todo modify this
      let data: any = []
      // if (key === 'role') {
      //   data = await db[key].findMany({
      //     where: {
      //       isdeleted: false,
      //     },
      //     orderBy: { id: "asc" },
      //   });
      // }
      // if (key === 'user') {
      //   data = await db[key].findMany({
      //     where: {
      //       isdeleted: false,// todo change to isdeleted
      //     },
      //     orderBy: { id: "asc" },
      //   });
      // }
      if (key === "picklist") {
        data = await db[key].findMany({
          where: {
            isdeleted: false,
            uniquename: {
              in: [...dataToFetchFromFieldId[key]],
            },
          },
          orderBy: { id: "asc" },
        })
      }
      if (key === "lookbook") {
        data = await db[key].findMany({
          where: {
            fieldid: {
              in: [...dataToFetchFromFieldId[key]],
            },
            isdeleted: false,
          },
          orderBy: { order: "asc" },
        })
      }
      dataFromTables = [...dataFromTables, ...data]
    }
  }

  //todo refactor
  const dataFromTablesLookBookGrouped = groupBy(dataFromTables, "fieldid")
  const dataFromTablesPickListGrouped = groupBy(dataFromTables, "uniquename")
  return { ...dataFromTablesLookBookGrouped, ...dataFromTablesPickListGrouped } || {}
})
