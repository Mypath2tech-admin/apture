import nodemailer from "nodemailer"
import type { User } from "../../generated/prisma"

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: process.env.EMAIL_SERVER_SECURE === "true",
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

interface OrganizationInviteEmailParams {
  user: User
  organizationName: string
  password: string
  message?: string
  inviterName?: string
}

export const sendOrganizationInviteEmail = async ({
  user,
  organizationName,
  password,
  message,
  inviterName,
}: OrganizationInviteEmailParams) => {
  const { email, firstName, lastName } = user
  const name = firstName && lastName ? `${firstName} ${lastName}` : email
  const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/signin`

  const mailOptions = {
    from: `"Greenor" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: `You've been invited to join ${organizationName} on Greenor`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Organization Invitation</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eaeaea;
          }
          .logo {
            max-width: 150px;
            height: auto;
          }
          .content {
            padding: 30px 20px;
            text-align: center;
          }
          h1 {
            color: #333;
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 24px;
          }
          p {
            margin-bottom: 20px;
            font-size: 16px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #10b981; /* Green color */
            color: white !important;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 600;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .button:hover {
            background-color: #059669;
          }
          .footer {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            font-size: 14px;
            border-top: 1px solid #eaeaea;
          }
          .credentials {
            font-family: monospace;
            font-size: 16px;
            background-color: #f3f4f6;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
            text-align: left;
          }
          .message-box {
            background-color: #f3f4f6;
            border-left: 4px solid #10b981;
            padding: 15px;
            margin: 20px 0;
            text-align: left;
            font-style: italic;
          }
          .feature {
            text-align: left;
            margin: 15px 0;
          }
          .feature-icon {
            color: #10b981;
            font-weight: bold;
            margin-right: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="color: #10b981;">Greenor</h2>
          </div>
          <div class="content">
            <h1>You've Been Invited to Join ${organizationName}</h1>
            <p>Hi ${name},</p>
            ${
              inviterName
                ? `<p>${inviterName} has invited you to join ${organizationName} on Greenor.</p>`
                : `<p>You have been invited to join ${organizationName} on Greenor.</p>`
            }
            
            ${
              message
                ? `
            <div class="message-box">
              <p>${message}</p>
            </div>
            `
                : ""
            }
            
            <p>Your account has been created with the following credentials:</p>
            
            <div class="credentials">
              <strong>Email:</strong> ${email}<br>
              <strong>Password:</strong> ${password}<br>
              <strong>Role:</strong> ${user.role.replace("_", " ")}
            </div>
            
            <p>Please use these credentials to log in. We recommend changing your password after your first login.</p>
            
            <a href="${loginUrl}" class="button">Log In to Greenor</a>
            
            <div style="margin-top: 30px; text-align: left;">
              <h3>With Greenor, you can:</h3>
              <div class="feature">
                <span class="feature-icon">✓</span> Track your expenses and income
              </div>
              <div class="feature">
                <span class="feature-icon">✓</span> Create and manage budgets
              </div>
              <div class="feature">
                <span class="feature-icon">✓</span> Generate financial reports
              </div>
              <div class="feature">
                <span class="feature-icon">✓</span> Collaborate with your team
              </div>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Greenor. All rights reserved.</p>
            <p>If you believe this invitation was sent in error, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  return transporter.sendMail(mailOptions)
}
