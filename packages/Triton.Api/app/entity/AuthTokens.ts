import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "AuthTokens" })
export class AuthTokens {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @ManyToOne(_ => User, user => user.tokens)
  public user!: User;

  @Column("character varying", { length: 128, nullable: true, unique: true })
  public serviceName?: string;

  @Column("character varying", { length: 4096, nullable: true })
  public accessToken?: string;

  @Column("character varying", { length: 4096, nullable: true })
  public code?: string;

  @Column("character varying", { length: 4096, nullable: true })
  public refreshToken?: string;

  @Column("character varying", { length: 4096, nullable: true })
  public stateKey?: string;
}
