import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProductModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }), PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
