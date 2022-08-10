import { ConfigModuleOptions } from '@nestjs/config';

export default (): ConfigModuleOptions => ({
  envFilePath: process.env.NODE_ENV,
});
