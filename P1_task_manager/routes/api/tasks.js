const express = require("express");
const router = express.Router();
const {
  getAllTask,
  createTask,
  updateTask,
  deletTask,
} = require("../../controllers/taskController");

router.route("/").get(getAllTask).post(createTask);

router.route(`/:id`).put(updateTask).delete(deletTask);

module.exports = router;
