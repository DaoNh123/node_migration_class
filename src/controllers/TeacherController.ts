import { Request, Response } from "express";
import { getRepository, Not } from "typeorm";
import { Student } from "../entities/Student";
import { Teacher } from "../entities/Teacher";
import { AppDataSource } from "../database/data-source";

class TeacherController {
  async index(request: Request, response: Response) {
    const repository = AppDataSource.getRepository(Teacher);
    const teachers = await repository.find();

    return response.json(teachers);
  }

  async find(request: Request, response: Response) {
    const { id } = request.params;
    const repository = AppDataSource.getRepository(Teacher);
    const teacher = await repository.findOne({
      where: { id: Number(id) },
      relations: ["students"],
    });

    if (!teacher)
      return response.status(400).json({ error: "Teacher not found!" });

    return response.json(teacher);
  }

  async find2(request: Request, response: Response) {
    const { id } = request.params;

    const teacherRepository = AppDataSource.getRepository(Teacher);
    const studentRepository = AppDataSource.getRepository(Student);

    const teacher = await teacherRepository.findOne({
      where: { id: Number(id) },
    });

    if (!teacher) {
      return response.status(400).json({ error: "teacher not found!" });
    }

    const teacherIds = await studentRepository.find({
      where: { teacher: { id: Number(id) } },
      select: ["id"],
    });

    // Lấy ra mảng id từ danh sách teacher
    const teacherIdList = teacherIds.map((p) => p.id);

    return response.json({
      teacher,
      teachers: teacherIdList, // chỉ trả về mảng id
    });
  }

  async create(request: Request, response: Response) {
    const { name, email, phone_number } = request.body;
    const repository = AppDataSource.getRepository(Teacher);

    if (await repository.findOne({ where: { email } }))
      return response.status(400).json({ error: "Email already exists!" });

    const teacher = new Teacher(name, email, phone_number);

    await repository.save(teacher);

    return response.status(201).json(teacher);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email } = request.body;
    const repository = AppDataSource.getRepository(Teacher);
    const teacher = await repository.findOne({
      where: { id: Number(id) },
    });

    if (!teacher)
      return response.status(400).json({ error: "teacher not found!" });

    if (
      await repository.findOne({
        where: {
          email,
          id: Not(Number(id)), // tìm email trùng nhưng id khác
        },
      })
    ) {
      return response.status(400).json({ error: "Email already exists!" });
    }

    teacher.name = name ? name : teacher.name;
    teacher.email = email ? email : teacher.email;

    await repository.save(teacher);

    return response.status(204).send();
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const repository = AppDataSource.getRepository(Teacher);

    if (
      !(await repository.findOne({
        where: {
          id: Number(id),
        },
      }))
    )
      return response.status(400).json({ error: "Teacher not found!" });

    await repository.delete(id);

    return response.status(204).send();
  }
}

export default new TeacherController();
