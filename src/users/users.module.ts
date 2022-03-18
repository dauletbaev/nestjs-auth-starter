import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { useFactory } from './hooks/useFactory';

@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: User.name, useFactory }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
