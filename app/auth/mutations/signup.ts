import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ name, email, phone, password, role, company }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        name: name,
        email: email.toLowerCase().trim(),
        phone: phone,
        hashedPassword,
        role: role,
        company: company,
        tenantId: 0,
      },
      select: { id: true, name: true, email: true, phone: true, role: true },
    })

    await ctx.session?.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
