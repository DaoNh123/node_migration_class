import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Student } from "./Student";

@Entity("teachers")
class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: "phone_number", type: "varchar", length: 20, nullable: true })
  phoneNumber?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Student, (student) => student.teacher)
  students: Student[];

  constructor(name: string, email: string, phoneNumber: string) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}

export { Teacher };
