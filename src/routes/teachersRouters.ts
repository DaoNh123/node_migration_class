import { Router } from "express";
import TeacherController from "../controllers/TeacherController";

const router = Router();

router.get("/", TeacherController.index);
router.post("/", TeacherController.create);
router.get("/:id", TeacherController.find);
router.get("/find2/:id", TeacherController.find2);
router.put("/:id", TeacherController.update);
router.delete("/:id", TeacherController.delete);

export { router };
