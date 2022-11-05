import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateUser = z.object({
  id: z.number(),
  tenantId: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.nullable(z.string()),
  role: z.string(),
  profile: z.string(),
  manager: z.nullable(z.number()),
  address: z.nullable(z.string()),
  city: z.nullable(z.string()),
  stateorprovince: z.nullable(z.string()),
  country: z.nullable(z.string()),
  postalcode: z.nullable(z.string()),
  officephone: z.nullable(z.string()),
  homephone: z.nullable(z.string()),
  alternateemail: z.nullable(z.string()),
  updatedAt: z.date(),
})

export default resolver.pipe(
  resolver.zod(UpdateUser),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const user = await db.user.update({ where: { id }, data: { ...data } })

    return user
  }
)
