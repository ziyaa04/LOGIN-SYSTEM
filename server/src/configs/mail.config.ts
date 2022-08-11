import { MailerOptions } from '@nestjs-modules/mailer';
import { resolve } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
export default (): MailerOptions => ({
  transport: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: Boolean(process.env.MAIL_SECURE),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
  defaults: {
    from: `${process.env.APP_NAME} <${process.env.MAIL_USER}>`,
    replyTo: process.env.MAIL_REPLY_USER,
  },
  template: {
    dir: resolve(process.cwd(), 'views', 'mail'),
    adapter: new EjsAdapter(),
  },
});
