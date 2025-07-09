import { Router } from "express";
import StudentController from "../controllers/StudentController";

const router = Router();

router.get("/", StudentController.index);
router.post("/", StudentController.create);
router.get("/:id", StudentController.find);
router.put("/:id", StudentController.update);
router.delete("/:id", StudentController.delete);

export { router };
