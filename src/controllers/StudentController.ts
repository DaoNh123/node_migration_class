import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Student } from "../entities/Student";
import { Teacher } from "../entities/Teacher";

class StudentController {
  async index(request: Request, response: Response) {
    const repository = getRepository(Student);
    const students = await repository.find({
      relations: ["teacher"],
    });

    return response.json(students);
  }

  async find(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Student);
    const student = await repository.findOne({
      where: { id: Number(id) },
    });

    if (!student)
      return response.status(400).json({ error: "Student not found!" });

    return response.json(student);
  }

  async create(request: Request, response: Response) {
    const { class_name, teacher_id } = request.body;
    const studentRepository = getRepository(Student);
    const teacherRepository = getRepository(Teacher);

    if (!class_name)
      return response
        .status(400)
        .json({ error: "Student class_name can't be null" });

    if (teacher_id === null)
      return response.status(400).json({ error: "Teacher ID can't be null" });

    if (!(await teacherRepository.findOne(teacher_id)))
      return response.status(400).json({ error: "Teacher not found!" });

    const teacher = await teacherRepository.findOne(teacher_id);

    const student = new Student(class_name, teacher);
    new Student(class_name, teacher);
    // const student = studentRepository.create({ class_name, teacher_id });

    await studentRepository.save(student);

    return response.status(201).json(student);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { class_name } = request.body;
    const repository = getRepository(Student);
    const student = await repository.findOne({
      where: { id: Number(id) },
    });

    if (!student)
      return response.status(400).json({ error: "Student not found!" });

    if (!class_name)
      return response
        .status(400)
        .json({ error: "Student class_name can't be null" });

    student.class_name = class_name;

    await repository.save(student);

    return response.status(204).send();
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Student);

    if (
      !(await repository.findOne({
        where: { id: Number(id) },
      }))
    )
      return response.status(400).json({ error: "Student not found!" });

    await repository.delete(id);

    return response.status(204).send();
  }
}

export default new StudentController();
