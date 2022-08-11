import { JwtVerifyOptions } from '@nestjs/jwt';

export default (): JwtVerifyOptions => ({
  secret: process.env.JWT_ACCESS_SECRET,
});
