import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Teacher } from "./Teacher";

@Entity("students")
class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  class_name: string;

  // @Column()
  // teacher_id: number;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: "teacher_id" })
  teacher: Teacher;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(name: string, class_name: string, teacher: Teacher) {
    this.name = name;
    this.class_name = class_name;
    this.teacher = teacher;
  }
}

export { Student };
