import express from "express";
const router = express.Router();

import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

// GET /employees

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const employees = await getEmployees();
      res.send(employees);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      if (!req.body) {
        return res.status(400).send("Request body required.");
      }

      if (!req.body.name || !req.body.birthday || !req.body.salary) {
        return res.status(400).send("Missing required fields.");
      }

      const employee = await createEmployee(req.body);
      res.status(201).send(employee);
    } catch (error) {
      next(error);
    }
  });

router.param("id", async (req, res, next, id) => {
  const employee = await getEmployee(id);

  if (!employee) {
    return res.status(404).send("No employee found.");
  }

  req.employee = employee;
  next();
});

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      res.send(req.employee);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      if (!req.body) {
        return res.status(400).send("Request body required.");
      }
      if (!req.body.name || !req.body.birthday || !req.body.salary) {
        return res.status(400).send("Missing required fields.");
      }

      const employee = await updateEmployee({
        id: req.employee.id,
        ...req.body,
      });
      res.send(employee);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const employee = await deleteEmployee(req.employee.id);

      res.status(204).send(employee);
    } catch (error) {
      next(error);
    }
  });

export default router;
