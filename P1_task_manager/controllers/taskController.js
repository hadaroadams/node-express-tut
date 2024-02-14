const Tasks = require("../model/Task");
const { asyncWrapper } = require("./../middleware/async");
const { createCustomeError } = require("./../errors/custom-error");
const time = new Date().getDate();

const getAllTask = asyncWrapper(async (req, res, next) => {
  const task = await Tasks.find({});
  console.log(task);
  res.status(200).json(task);
});

const createTask = asyncWrapper(async (req, res, next) => {
  const { message, marked } = req.body;
  console.log(req.body);
  if (!message)
    return next(createCustomeError(`You didn't say the message`, 401));
  const duplicate = await Tasks.findOne({ message }).exec();
  if (duplicate)
    return next(createCustomeError("There is already a task like this", 409));
  const result = await Tasks.create({ message, marked, time });
  return res.status(201).json(result);
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { message } = req.message;
  if (!message || !id)
    return next(
      createCustomeError(`You need to specify an I and a messgae`, 400)
    );
  const foundTask = await Tasks.findOne({ _id: id }).exec();
  console.log(foundTask);
  if (!foundTask) return next(createCustomeError("Id doesnt march any", 404));
  foundTask.message = message;
  const result = await foundTask.save();
  return res.status(200).json({ message: "Data has been Updated", result });
});

const deletTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createCustomeError(`id needs to be specified`));
  const task = await Tasks.findOneAndDelete({ _id: id });
  if (!task)
    return next(createCustomeError(`there not a task like that `), 404);
  return res.status(200).json(task);
});
module.exports = { getAllTask, createTask, updateTask, deletTask };
