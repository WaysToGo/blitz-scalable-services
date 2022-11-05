import { resolver, SecurePassword } from "blitz"
import db from "db"
import { z } from "zod"

const CreateUser = z.object({
  tenantId: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.optional(z.string()),
  role: z.string(),
  profile: z.string(),
  address: z.optional(z.string()),
  manager: z.optional(z.number()),
  city: z.optional(z.string()),
  stateorprovince: z.optional(z.string()),
  country: z.optional(z.string()),
  postalcode: z.optional(z.string()),
  officephone: z.optional(z.string()),
  homephone: z.optional(z.string()),
  alternateemail: z.optional(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export default resolver.pipe(resolver.zod(CreateUser), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const user = await db.user.create({
    data: { ...input, hashedPassword: await SecurePassword.hash("Welcome") },
  })

  return user
})
