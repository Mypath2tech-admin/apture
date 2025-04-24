import nodemailer from "nodemailer"
import type { User } from "../../generated/prisma"

// Configure nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: process.env.EMAIL_SERVER_SECURE === "true",
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
})

// Email verification template
export const sendVerificationEmail = async (user: User, verificationUrl: string) => {
    const { email, firstName, lastName } = user
    const name = firstName && lastName ? `${firstName} ${lastName}` : email

    const mailOptions = {
        from: `"Greenor" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: "Verify Your Email Address",
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
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
          .verification-code {
            font-family: monospace;
            font-size: 18px;
            background-color: #f3f4f6;
            padding: 10px 15px;
            border-radius: 4px;
            letter-spacing: 2px;
            margin: 20px 0;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="color: #10b981;">Greenor</h2>
          </div>
          <div class="content">
            <h1>Verify Your Email Address</h1>
            <p>Hi ${name},</p>
            <p>Thank you for signing up! Please verify your email address to complete your registration.</p>
            <a href="${verificationUrl}" class="button">Verify Email</a>
            <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
            <p style="word-break: break-all; font-size: 14px; color: #6b7280;">
              ${verificationUrl}
            </p>
            <p>This link will expire in 24 hours.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Greenor. All rights reserved.</p>
            <p>If you didn't create an account, you can safely ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    }

    return transporter.sendMail(mailOptions)
}

// Welcome email template after verification
export const sendWelcomeEmail = async (user: User) => {
    const { email, firstName, lastName } = user
    const name = firstName && lastName ? `${firstName} ${lastName}` : email

    const mailOptions = {
        from: `"Greenor" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: "Welcome to Greenor!",
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Greenor</title>
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
            <h1>Welcome to Greenor!</h1>
            <p>Hi ${name},</p>
            <p>Thank you for verifying your email address. Your account is now active and you can start using Greenor!</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Go to Dashboard</a>
            <div style="margin-top: 30px; text-align: left;">
              <h3>Here's what you can do with Greenor:</h3>
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
                <span class="feature-icon">✓</span> Track time and expenses for projects
              </div>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Greenor. All rights reserved.</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    }

    return transporter.sendMail(mailOptions)
}
