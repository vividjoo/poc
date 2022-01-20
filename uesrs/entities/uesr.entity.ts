import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
} from "typeorm";
import { IsEmail, IsString } from "class-validator";

/**
 * @author Joo
 * @description
 * PrimaryGeneratedColumn: Primary key를 의미하며, 별다른 설정 하지 않는다면 auto_increment가 적용이 된다.
 * IsEmail: email 유효성 검사를 위해 추가 한다.
 * CreateDateColumn: 생성한 날짜
 * BeforeInsert: DB에 저장 되기 전에 실행 한다.
 * makingVideo: 비디오를 만드려는 목적 -> typeorm postgresql에서 array을 사용 하는 방법 설정 해놓음
 *
 */

export enum UserRole {
  ADMIN = "admin",
  USER = "users",
  ENTERPRISE = "enterprises",
}

@Entity("users")
@Unique(["email"])
export class Users {
  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  @IsString()
  username!: string;

  @Column()
  password!: string;

  @IsString()
  @Column({ nullable: true })
  company: string;

  @IsString()
  @Column({ nullable: true })
  companyCode: string;

  @Column("boolean", {
    nullable: true,
    array: true,
    default: [false, false, false, false],
  })
  makingVideoForReason: boolean[];

  @CreateDateColumn()
  createAt!: Date;
}
