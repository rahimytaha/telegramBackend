import { Module } from '@nestjs/common';

import { GetwayModule } from './getway/getway.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { APP_GUARD, APP_INTERCEPTOR, RouterModule, Routes } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
const routes: Routes = [
  { path: '/user', module: UserModule },
  { path: '/auth', module: AuthModule },
];
@Module({
  imports: [
    AuthModule,
    GetwayModule,
    JwtModule.register({secret:"123",signOptions:{expiresIn:"7d"}}),
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
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
