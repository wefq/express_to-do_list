const express = require("express");
const uuid = require("uuid");
const tasks = require("../../Tasks");
const router = express.Router();

// All Tasks
router.get("/", (req, res) => {
	res.json(tasks);
});

// New Task
router.post("/", (req, res) => {
	const date = new Date();

	const newTask = {
		id: uuid.v4(),
		...req.body,
		date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
	};

	if (!newTask.task) {
		// res.redirect("/");
		return res.status(400).json({ msg: "Task cannot be empty" });
	}

	tasks.push(newTask);
	// res.json(tasks);
	res.redirect("/");
});

// Get A Task
router.get("/:id", (req, res) => {
	const found = tasks.some((task) => task.id === parseInt(req.params.id));
	const taskIndex = tasks.findIndex((task) => task.id === parseInt(req.params.id));

	if (found) {
		res.json(tasks[taskIndex]);
	} else {
		res.status(400).json({ msg: `Task with id of ${req.params.id} not found` });
	}
});

// Delete Task
router.delete("/:id", (req, res) => {
	const found = tasks.some((task) => task.id === parseInt(req.params.id));

	const deletedIndex = tasks.findIndex((task) => task.id === parseInt(req.params.id));
	tasks.splice(deletedIndex, 1);

	if (found) {
		console.log('work')
		res.json({ msg: "Task deleted", tasks });
	} else {
		res.status(400).json({ msg: `Task with id of ${req.params.id} not found` });
	}
});

// Update Task
router.put("/:id", (req, res) => {
	const found = tasks.some((task) => task.id === parseInt(req.params.id));

	const changedIndex = tasks.findIndex((task) => task.id === parseInt(req.params.id));
	const changedTask = tasks[changedIndex];

	if (found) {
		const updTask = req.body;
		
		changedTask.task = updTask.task ? updTask.task : changedTask.task;
		changedTask.description = updTask.description;

		res.json({ msg: "Task updated", task: changedTask });
	} else {
		res.status(400).json({ msg: `Task with id of ${req.params.id} not found` }); 
	}
});

module.exports = router;
