import { MailerSendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-send-mail-options.interface';

export const DefaultContext = {};

export interface IMailService {
  sendVerifyAccountMail(to: string, url: string, context: object);
  sendChangePasswordMail(to: string, url: string, context: object);
  generateMessage(
    to: string,
    subject: string,
    options: MailerSendMailOptions,
  ): MailerSendMailOptions;
  generateVerifyAccountMessage(
    to: string,
    url: string,
    context: object,
  ): MailerSendMailOptions;
  generateChangePasswordMessage(
    to: string,
    url: string,
    context: object,
  ): MailerSendMailOptions;
}
