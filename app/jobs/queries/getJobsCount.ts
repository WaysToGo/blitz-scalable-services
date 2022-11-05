import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const getJobsCount = z.object({
})

export default resolver.pipe(resolver.zod(getJobsCount), resolver.authorize(), async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const count = await db.job.count()

  return count
})
