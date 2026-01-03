import { Module } from '@nestjs/common';
import { MyGetway } from './getway';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[JwtModule],
    providers:[MyGetway]
})
export class GetwayModule {}
