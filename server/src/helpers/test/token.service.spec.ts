import { ISignPayload } from '../types/token.types';
import RolesEnum from '../../enums/roles.enum';
import { TokenService } from '../token.service';
import { Test } from '@nestjs/testing';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { matchersWithOptions } from 'jest-json-schema';

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
  describe('signAccessToken  function', () => {
    let payload: ISignPayload;
    beforeEach(() => {
      payload = {
        email: 'example@gmail.com',
        isActivated: true,
        roles: [RolesEnum.USER],
      };
    });
    test('to be defined', () => {
      expect(tokenService.signAccessToken).toBeDefined();
      expect(tokenService.signAccessToken).not.toBeUndefined();
    });
    test('schema match result', () => {
      const schema = {
        type: 'string',
      };
      expect(tokenService.signAccessToken(payload)).toMatchSchema(schema);
    });
  });
});
