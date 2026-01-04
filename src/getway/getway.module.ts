import { Module } from '@nestjs/common';
import { MyGetway } from './getway';
import { JwtModule } from '@nestjs/jwt';
import { GetwayService } from './getway.service';

@Module({
    imports:[JwtModule],
    providers:[MyGetway,GetwayService]
})
export class GetwayModule {}
