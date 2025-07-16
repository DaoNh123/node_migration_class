import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudents1752069188014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "students",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
          },
          {
            name: "name",
            type: "text",
            isNullable: false,
          },
          {
            name: "teacher_id",
            type: "int",
            isNullable: false,
            isUnique: false,
          },
          {
            name: "class_name",
            type: "varchar(5)",
            isNullable: false,
            isUnique: false,
          },
          {
            name: "created_at",
            type: "timestamp without time zone",
            isNullable: false,
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp without time zone",
            isNullable: false,
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("students");
  }
}
