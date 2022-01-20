import { Controller, Post, Body } from "@nestjs/common";
import { UesrsService } from "./uesrs.service";
import { CreateUesrDto } from "./dto/create-uesr.dto";

@Controller("uesrs")
export class UesrsController {
  constructor(private readonly uesrsService: UesrsService) {}

  /**
   * @author Joo
   * @description
   *    회원 가입
   *    가입 할 때 입력 받은 메일로 이메일 발송
   *
   * @param createUserDto
   *
   */
  @Post("register")
  @ApiOperation({
    summary: "사용자 회원가입",
    description: "회원가입 - username, password, gmail",
  })
  @ApiResponse({
    description: "status code",
  })
  public async registerController(
    @Body() createUserDto: CreateUserDto
  ): Promise<TtvApiRegisterResponse> {
    return this.usersService.create(createUserDto);
  }

  /**
   * @author Joo 
   * @description
   *    로그인 기능을 한다.
   * @return
   *    TtvApiLoginResponse types.ts에 명시 되어 있음
   *
   * @param
   *    loginController(@Body() reqBody: TtvApiLoginRequestBody) types.ts에 기재 되어 있음
   
   */
  @Post("login")
  @ApiOperation({
    summary: "사용자 로그인",
    description: "login - email, password",
  })
  @ApiResponse({
    description: "status code, TtvApiLoginResponseUserInfo",
  })
  public async loginController(
    @Body() reqBody: TtvApiLoginRequestBody
  ): Promise<TtvApiLoginResponse> {
    return this.authService.jwtLogin(reqBody);
  }
}
