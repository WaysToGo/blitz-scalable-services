import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
type SupportMailer = {
  name?: string
  from?: string
  subject: string
  description: string
  type?: string
  priority?: string
}

export function supportMailer({ name, from, subject, description, type, priority }: SupportMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const msg = {
    from: { name: name, email: "support@ats.com" },
    to: "shiva@ats.com",
    cc: from,
    subject: subject,
    html: `
          <div>
          <p>Hi Team,</p>
          <p>Recieved the following support request from <b>${name}</b>.</p>
          <p>Type: <b>${type}</b></p>
          <p>Priority: <b>${priority}</b></p>
          <p>Description: <b>${description}</b></p>
          </div>
    `,
  }

  return {
    async send() {
      sgMail
        .send(msg)
        .then((response) => {
          console.log(response[0].statusCode)
          console.log(response[0].headers)
        })
        .catch((error) => {
          console.error(error)
        })
    },
  }
}
