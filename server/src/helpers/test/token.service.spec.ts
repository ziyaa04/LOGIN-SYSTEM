import { ISignPayload } from '../types/token.types';
import RolesEnum from '../../enums/roles.enum';
import { TokenService } from '../token.service';
import { Test } from '@nestjs/testing';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { matchersWithOptions } from 'jest-json-schema';
import { User } from '../../models/user.model';

describe('Token service tests', () => {
  let tokenService: TokenService;
  expect.extend(
    matchersWithOptions({
      verbose: true,
    }),
  );
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'some secret',
          signOptions: {
            expiresIn: '24h',
          },
        }),
      ],
      providers: [TokenService],
    }).compile();

    tokenService = await module.resolve(TokenService);
  });
  describe('Sign function', () => {
    let payload: ISignPayload;
    let signConfigRefresh: JwtSignOptions;
    beforeEach(() => {
      payload = {
        email: 'example@gmail.com',
        isActivated: true,
        roles: [RolesEnum.USER],
      };
      signConfigRefresh = {
        secret: 'some secret',
        expiresIn: '24h',
      };
    });
    test('to be defined', () => {
      expect(tokenService.sign).toBeDefined();
      expect(tokenService.sign).not.toBeUndefined();
    });
    test('schema match result', () => {
      const schema = {
        type: 'string',
      };
      expect(tokenService.sign(payload, signConfigRefresh)).toMatchSchema(
        schema,
      );
    });
  });
  describe('VerifyToken function', () => {
    let token: string;
    beforeEach(() => {
      token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.WN_Gv1LJq5JVCgXVKUl7He0t8FWom4BSAPceABeGwzk';
    });
    test('to be defined', () => {
      expect(tokenService.verifyToken).toBeDefined();
      expect(tokenService.verifyToken).not.toBeUndefined();
    });
    test('schema match result', () => {
      const schema = {
        type: 'object',
        properties: {
          email: {
            type: 'string',
          },
          iat: {
            type: 'number',
          },
        },
      };
      expect(tokenService.verifyToken(token)).toMatchSchema(schema);
    });
    test('check result', () => {
      expect(tokenService.verifyToken(token)).toHaveProperty(
        'email',
        'example@gmail.com',
      );
    });
  });
  describe('GeneratePayload function', () => {
    let user;
    beforeEach(() => {
      user = {
        email: 'example@gmail.com',
        isActivated: true,
        roles: [RolesEnum.USER],
      };
    });
    test('to be defined', () => {
      expect(tokenService.generatePayload).toBeDefined();
      expect(tokenService.generatePayload).not.toBeUndefined();
    });
    test('to match scheme', () => {
      const scheme = {
        type: 'object',
        properties: {
          email: {
            type: 'string',
          },
          isActivated: {
            type: 'boolean',
          },
          roles: {
            type: 'array',
          },
        },
      };
      expect(tokenService.generatePayload(user)).toMatchSchema(scheme);
    });
    test('check result', () => {
      const res = {
        email: 'example@gmail.com',
        isActivated: true,
        roles: [RolesEnum.USER],
      };
      expect(tokenService.generatePayload(user)).toEqual(res);
    });
  });
});
