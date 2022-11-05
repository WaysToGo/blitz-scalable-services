import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateRole = z.object({
  tenantid: z.number(),
  name: z.string(),
  description: z.string(),
  isdeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export default resolver.pipe(resolver.zod(CreateRole), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const role = await db.role.create({ data: { ...input } })

  return role
})
