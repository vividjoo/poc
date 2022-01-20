import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../../users/entities/users.entity";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { ErrorCodes } from "../../../consts";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  /**
   * @author Joo
   * @param payload
   * @description
   *        유효성 체크 함수
   *        이메일을 찾고, 해당 유저가 있으면 유저 정보를 리턴
   * @returns
   */
  async validate(payload: CreateUserDto) {
    const user: Users = await this.userRepository.findOne({
      email: payload.email,
    });
    user.password = undefined;
    if (user) {
      return user;
    } else {
      this.logger.error(`validation failed(${ErrorCodes.VALIDATE_FAILED})`);
      throw new UnauthorizedException("validate function error");
    }
  }
}
