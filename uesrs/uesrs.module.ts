import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./entities/users.entity";
import { SendmailModule } from "../sendmail/sendmail.module";

/**
 * @author Joo
 * @description
 *    TypeOrmModule.forFeature(): forFeature() method to define which repositories are registered in the current scope.
 *                                With that in place, we can inject the UsersRepository into the UsersService using the @InjectRepository() decorator
 */
@Module({
  imports: [TypeOrmModule.forFeature([Users]), SendmailModule],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
