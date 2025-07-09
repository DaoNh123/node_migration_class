import { Router } from "express";
import { router as studentsRouters } from "./studentsRouters";
import { router as teachersRouter } from "./teachersRouters";

const router = Router();

router.use("/users", teachersRouter);
router.use("/students", studentsRouters);

export { router };
