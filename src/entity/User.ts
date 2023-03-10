import { Entity, Column, PrimaryColumn, BeforeInsert, BaseEntity } from "typeorm";
import { v4 as uuidV4 } from "uuid";
@Entity()
export class User extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("text")
  password: string;

  @Column()
  age: number;

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
