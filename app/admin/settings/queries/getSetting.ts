import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetSetting = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetSetting), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const setting = await db.tenants.findFirst({ where: { id } })

  if (!setting) throw new NotFoundError()

  return setting
})
