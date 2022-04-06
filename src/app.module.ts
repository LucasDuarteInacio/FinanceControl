import { Global, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from './shared/prisma.service';

@Global()
@Module({
  imports: [UserModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
