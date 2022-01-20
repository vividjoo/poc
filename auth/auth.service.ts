import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../users/entities/users.entity";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import {
  LoginAPIRequestBody,
  LoginAPIResponse,
  LoginAPIResponseUserInfo,
} from "types";
import { ErrorCodes } from "../../consts";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private jwtService: JwtService
  ) {}

  /**
   * @author Joo
   * @return
   *    LoginAPIResponse types.ts에 기재 되어 있음
   * @description
   *      JwtService를 사용 하기 위해서는 해당 모듈에서의 JwtModule.register를 import 해야 함
   *      이메일 체크, 비밀번호 체크 후, statuscode, result(LoginAPIResponseUserInfo은 Types에 기재), token을 리턴
   */
  async jwtLogin(data: LoginAPIRequestBody): Promise<LoginAPIResponse> {
    const { email, password } = data;

    const user: Users | undefined = await this.usersRepository.findOne({
      where: { email: email },
    });

    this.logger.debug(JSON.stringify(user, null, 2));

    if (user === undefined) {
      this.logger.warn(
        `unavailable id(${ErrorCodes.UNAVAILABLE_ID}) with (${email})`
      );
      throw new BadRequestException(`${ErrorCodes.UNAVAILABLE_ID}`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      this.logger.warn(
        `wrong password(${ErrorCodes.WRONG_PASSWORD}) with : ${email}`
      );
      throw new BadRequestException(`${ErrorCodes.WRONG_PASSWORD}`);
    }

    const payload = {
      email: email,
      id: user.id,
      username: user.username,
    };

    return {
      result: {
        id: user.id,
        email: user.email,
        username: user.username,
        token: this.jwtService.sign(payload),
      } as LoginAPIResponseUserInfo,
    } as LoginAPIResponse;
  }
}
