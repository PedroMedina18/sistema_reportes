import { Router } from "express";
import * as emails from "../controllers/emails.js";
import * as reports from "../controllers/reports.js";
import * as type_reports from "../controllers/type_reports.js";
import * as users from "../controllers/users.js";
import * as departments from "../controllers/departments.js";
import { login } from "../controllers/login.js";
const router = Router();

router.get("/emails/", emails.getEmail);
router.post("/emails/", emails.postEmail);
router.put("/emails/:id/", emails.putEmail);
router.delete("/emails/:id/", emails.deleteEmail);

router.get("/users/", users.getUser);
router.get("/users/:id/", users.getUser);
router.post("/users/", users.postUser);
router.put("/users/:id/", users.putUser);
router.delete("/users/:id/", users.deleteUser);

router.get("/reports/", reports.getReport);
router.get("/reports/:id/", reports.getReport);
router.post("/reports/", reports.postReport);
router.put("/reports/:id/", reports.putReport);
router.delete("/reports/:id/", reports.deleteReport);

router.get("/type_reports/", type_reports.getTypeReport);
router.get("/type_reports/:id/", type_reports.getTypeReport);
router.post("/type_reports/", type_reports.postTypeReport);
router.put("/type_reports/:id/", type_reports.putTypeReport);
router.delete("/type_reports/:id/", type_reports.deleteTypeReport);

router.get("/departments/", departments.getDepartment);
router.get("/departments/:id/", departments.getDepartment);
router.post("/departments/", departments.postDepartment);
router.put("/departments/:id/", departments.putDepartment);
router.delete("/departments/:id/", departments.deleteDepartment);

router.get("/type_reports/", type_reports.getTypeReport);
router.get("/type_reports/:id/", type_reports.getTypeReport);
router.post("/type_reports/", type_reports.postTypeReport);
router.put("/type_reports/:id/", type_reports.putTypeReport);
router.delete("/type_reports/:id/", type_reports.deleteTypeReport);

router.post("/login", login);

export default router;