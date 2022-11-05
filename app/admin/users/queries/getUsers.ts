import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetUsersInput
  extends Pick<Prisma.UserFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(resolver.authorize(), async ({ where, orderBy }: GetUsersInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  let users = await db.user.findMany({
    where: {
      isdeleted: false,
      ...where,
    },
    orderBy,
  })

  users = users.map((item) => {
    const managerName = users.find((user) => user.id === item.manager)
    return {
      ...item,
      managerName: managerName ? managerName.name : "",
      hashedPassword: null,
    }
  })

  return {
    users,
    data: users,
  }
})
