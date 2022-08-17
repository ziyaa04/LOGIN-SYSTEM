import { Test } from '@nestjs/testing';
import { matchersWithOptions } from 'jest-json-schema';
import { MailService } from '../mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

describe('Token service tests', () => {
  let mailService: MailService;
  expect.extend(
    matchersWithOptions({
      verbose: true,
    }),
  );
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: 'dev.env',
        }),
        MailerModule.forRoot({
          transport: {
            host: 'example',
            port: 0,
            secure: false,
            auth: {
              user: 'example',
              pass: 'pass',
            },
          },
          defaults: {
            from: `<example@gmail.com>`,
            replyTo: '<example@gmail.com>',
          },
        }),
      ],
      providers: [MailService],
    }).compile();

    mailService = await module.resolve(MailService);
  });
  describe('generateMessage function', () => {
    let to: string;
    let subject: string;
    beforeEach(() => {
      to = 'example@gmail.com';
      subject = 'example';
    });
    test('to be defined', () => {
      expect(mailService.generateMessage).toBeDefined();
      expect(mailService.generateMessage).toBeDefined();
    });

    test('match schema ', () => {
      const schema = {
        properties: {
          to: {
            type: 'string',
          },
          subject: {
            type: 'string',
          },
        },
        required: ['to', 'subject'],
      };
      console.dir(mailService.generateMessage(to, subject, {}));
      expect(mailService.generateMessage(to, subject, {})).toMatchSchema(
        schema,
      );
    });
    test('check result', () => {
      expect(mailService.generateMessage(to, subject, {})).toEqual({
        to,
        subject,
      });
    });
  });
  describe('generateApiUrl function', () => {
    let url: string;
    beforeEach(() => {
      url = 'example';
    });
    test('to be defined', () => {
      expect(mailService.generateApiUrl).toBeDefined();
      expect(mailService.generateApiUrl).not.toBeUndefined();
    });
    test('to match schema', () => {
      const schema = {
        type: 'string',
      };
      expect(mailService.generateApiUrl(url)).toMatchSchema(schema);
    });
    test('to match result', () => {
      expect(mailService.generateApiUrl(url)).toEqual(
        `${process.env.API_URL}/${url}`,
      );
    });
  });
  describe('generateClientUrl function', () => {
    let url: string;
    beforeEach(() => {
      url = 'example';
    });
    test('to be defined', () => {
      expect(mailService.generateClientUrl).toBeDefined();
      expect(mailService.generateClientUrl).not.toBeUndefined();
    });
    test('to match schema', () => {
      const schema = {
        type: 'string',
      };
      expect(mailService.generateClientUrl(url)).toMatchSchema(schema);
    });
    test('to match result', () => {
      expect(mailService.generateClientUrl(url)).toEqual(
        `${process.env.CLIENT_URL}/${url}`,
      );
    });
  });
});
