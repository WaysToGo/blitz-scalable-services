import { resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRolesInput
  extends Pick<Prisma.RoleFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(resolver.authorize(), async ({ where, orderBy }: GetRolesInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const roles = await db.role.findMany({
    where: {
      isdeleted: false,
    },
    orderBy,
  })

  return {
    roles,
    data: roles,
  }
})
