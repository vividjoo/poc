import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";
import { Column } from "typeorm";
import { UserRole } from "../entities/users.entity";

/**
 * @author
 */

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ type: "string", description: "username" })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: "string", description: "password" })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: "string", description: "email" })
  email: string;

  // @IsBoolean()
  makingVideoForReason: boolean[];

  // @IsString()
  company: string;

  // @IsString()
  companyCode: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
