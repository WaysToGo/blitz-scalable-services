import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateSetting = z.object({
  id: z.number(),
  customername: z.string(),
  hostname: z.string(),
  bucketname: z.string(),
  region: z.string(),
  foldername: z.string(),
  secretkey: z.string(),
  accesskey: z.string(),
  updatedat: z.date(),
})

export default resolver.pipe(
  resolver.zod(UpdateSetting),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const setting = await db.tenants.update({ where: { id }, data })

    return setting
  }
)
