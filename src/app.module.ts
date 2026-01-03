import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetwayModule } from './getway/getway.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RouterModule, Routes } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
const routes: Routes = [{ path: '/user', module: UserModule }];
@Module({
  imports: [
    GetwayModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RouterModule.register(routes),
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost',
      port: 3306, 
      username: 'root', 
      password: 'Tt9119573449',
      database: 'taha', 
      autoLoadEntities: true, 
      synchronize: true, 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
