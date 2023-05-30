const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks.",
    });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { name } = req.body;
    const existingTask = await Task.findOne({ name });
    if (existingTask) {
      return res.status(400).json({
        success: false,
        message: "A task with this name already exists.",
      });
    }
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating a task.",
    });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body);
    if (updatedTask) {
      res.status(200).json({
        success: true,
        message: "Task updated successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating the task.",
    });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (deletedTask) {
      res.status(200).json({
        success: true,
        message: "Task deleted successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting the task.",
    });
  }
};
