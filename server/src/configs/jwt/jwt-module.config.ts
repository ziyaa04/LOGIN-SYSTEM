import { JwtModuleOptions } from '@nestjs/jwt';

export default (): JwtModuleOptions => ({
  secret: process.env.JWT_REFRESH_SECRET,
  signOptions: {
    expiresIn: process.env.JWT_REFRESH_EXPIRES,
  },
});
