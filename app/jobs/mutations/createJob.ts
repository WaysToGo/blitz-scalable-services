import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateJob = z.object({
  company: z.string(),
  description: z.string(),
  experience: z.number(),
  title: z.string(),
})

export default resolver.pipe(resolver.zod(CreateJob), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const experience = +input.experience
  const job = await db.job.create({ data: input })

  return job
})
