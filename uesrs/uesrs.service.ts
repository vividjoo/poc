import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

import { Repository } from "typeorm";
import { UserRole, Users } from "./entities/users.entity";
import { TtvApiRegisterResponse } from "types";
import * as bcrypt from "bcrypt";
import { ErrorCodes } from "../../consts";

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  /**
   * @author Joo
   * @param createUserDto (username, email, password)
   * @description
   *    username, email, password 모두가 입력 되지 않았을 경우 if문에서 리턴 시킨다.
   *    데이터가 모두 입력 되었을 시, email 중복값을 확인 하며, 중복 된 값이 DB에 있을 시 리턴 시킨다.
   *    입력 받은 값들에 대해 유효성 검사를 하고 DB에 저장 한다.
   *    bcrypt.hash(password, saltOrRounds):
   *    switch문
   *    - role이 user, enterprise인 경우와 그 외 경우는 default에서 처리
   *
   * @returns
   *
   */
  async create(createUserDto: CreateUserDto): Promise<TtvApiRegisterResponse> {
    const { username, email, password, ...userInfo } = createUserDto;
    if (
      email === undefined ||
      password === undefined ||
      username === undefined ||
      (await this.usersRepository.findOne({ where: { email: email } }))
    ) {
      this.logger
        .error(`wrong register data(${ErrorCodes.WRONG_REGISTER_DATA}) : email(${email}),
        password(${password}), username(${username})`);
      throw new BadRequestException(`${ErrorCodes.WRONG_REGISTER_DATA}`);
    }

    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = hashPassword;

    switch (userInfo.role) {
      case UserRole.ENTERPRISE:
        if (userInfo.company === undefined) {
          this.logger.error(
            `wrong register data(${ErrorCodes.WRONG_REGISTER_DATA}) : userInfo.company(${userInfo.company})`
          );
          throw new BadRequestException(`${ErrorCodes.WRONG_REGISTER_DATA}`);
        }
        await this.usersRepository.save(createUserDto);
        break;
      case UserRole.USER:
        await this.usersRepository.save(createUserDto);
        break;
      default:
        this.logger.log(
          `wrong register data(${ErrorCodes.WRONG_REGISTER_DATA}) : userInfo.role(${userInfo.role})`
        );
        throw new BadRequestException(`${ErrorCodes.WRONG_REGISTER_DATA}`);
    }
    return {} as TtvApiRegisterResponse;
  }
}

// export class TtvApiRegisterResponse {}
