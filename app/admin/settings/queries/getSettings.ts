import { resolver } from "blitz"
import db, { Prisma } from "db"

interface GetSettingsInput
  extends Pick<Prisma.TenantsFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(resolver.authorize(), async ({ where, orderBy }: GetSettingsInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const settings = await db.tenants.findMany({
    where: {
      isdeleted: false,
    },
    orderBy,
  })

  return {
    settings,
    data: settings,
  }
})
