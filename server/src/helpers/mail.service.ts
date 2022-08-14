import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { DefaultContext, IMailService } from './types/mail.types';
import { Request } from 'express';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly mailer: MailerService) {}

  generateMessage(
    to: string,
    subject: string,
    options: ISendMailOptions,
  ): ISendMailOptions {
    return {
      ...options,
      to,
      subject,
    };
  }

  generateChangePasswordMessage(
    to: string,
    url: string,
    context: object = DefaultContext,
  ): ISendMailOptions {
    return this.generateMessage(
      to,
      `${process.env.APP_NAME} | Change Password`,
      {
        template: 'change-password',
        context: { ...context, url },
      },
    );
  }

  generateVerifyAccountMessage(
    to: string,
    url: string,
    context: object = DefaultContext,
  ): ISendMailOptions {
    return this.generateMessage(
      to,
      `${process.env.APP_NAME} | Verify Account`,
      {
        template: 'verify-account',
        context: { ...context, url: this.generateApiUrl('auth/verify/' + url) },
      },
    );
  }

  async sendChangePasswordMail(
    to: string,
    url: string,
    context: object = DefaultContext,
  ) {
    return await this.mailer.sendMail(
      this.generateChangePasswordMessage(to, url, context),
    );
  }

  async sendVerifyAccountMail(
    to: string,
    url: string,
    context: object = DefaultContext,
  ) {
    return await this.mailer.sendMail(
      this.generateVerifyAccountMessage(to, url, context),
    );
  }

  checkLastMailTime(req: Request) {
    if (!req.cookies.lastMailTime) return true;
    const lastMailTime = Number(req.cookies.lastMailTime);
    const passTime = (Number(new Date()) - lastMailTime) / 1000;
    if (passTime >= Number(process.env.MAIL_DURATION_TIME)) return true;
    return false;
  }

  generateApiUrl(url) {
    return `${process.env.API_URL}/${url}`;
  }

  generateClientUrl(url) {
    return `${process.env.CLIENT_URL}/${url}`;
  }
}
