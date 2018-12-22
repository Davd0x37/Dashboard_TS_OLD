import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuthTokens } from "./AuthTokens";

@Entity({ name: "Users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @Column("varchar", { length: 512, unique: true, nullable: false })
  public login!: string;

  @Column("varchar", { length: 512, nullable: false })
  public password!: string;

  @Column("varchar", { length: 512, unique: true, nullable: false })
  public email!: string;

  @Column("text", { nullable: true })
  public avatar?: string;

  @Column("date", { nullable: false })
  public registerDate!: string;

  @Column("boolean", { nullable: false })
  public isOnline!: boolean;

  @OneToMany(_ => AuthTokens, token => token.user)
  public tokens?: AuthTokens[];
}
