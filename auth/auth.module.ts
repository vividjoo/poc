import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../users/entities/users.entity";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt/jwt.strategy";

/**
 * @author Joo
 *
 * @description
 *    해당 모듈에서 JwtService를 이용하기 위해 import에 JwtModule.register() 설정.
 *    secret은 유출 되지 않게 따로 설정 파일에 해놓음, expiresInt는 토큰 유효 기간
 *    Passport도 동일하게 설정.
 */

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: "1h" },
    }),
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
