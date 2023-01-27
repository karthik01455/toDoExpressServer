const PORT = 4000;
const express = require('express');
const app = express();
app.use(express.json());
let tasks = [];
let id = 0;
const getTasks = (req, res) => {
    res.status(200).json(tasks);

}
const postTasks = (req, res) => {
    const task = {
        ...req.body,
        id: id++,
        isCompleted: false
    }
    tasks.push(task);
    res.status(201);
    res.send(task);
    res.end();
}
const deleteCompletedTasks = (req, res) => {
    tasks = tasks.filter(task => task.isCompleted === false);
    res.status(200).json(tasks);
}
const putTasks = (req, res) => {
    const { id } = (req.params);
    const index = tasks.findIndex(task => parseInt(task.id) === parseInt(id));
    if (index === -1) {
        res.status(404).send('Not Found');
    } else {
        tasks[index]={...req.body};
        res.status(200).json(tasks[index]);
    }
}
const patchTasks = (req, res) => {
    const { id } = (req.params);
    const index = tasks.findIndex(task => parseInt(task.id) === parseInt(id));
    if (index === -1) {
        res.status(404).send('Not Found');
    } else {
        tasks[index].isCompleted=req.body.isCompleted;
        res.status(200).json(tasks[index]);
    }
}
const getTasksById=(req, res)=>
{   const { id } = (req.params);
    const index = tasks.findIndex(task => parseInt(task.id) === parseInt(id));
    if (index === -1) {
        res.status(404).send('Not Found');
    } else {
        res.status(200).json(tasks[index]);
    }

}
app.route('/todos')
    .get(getTasks)
    .post(postTasks)
    .delete(deleteCompletedTasks);
app.route('/todos/:id')
    .put(putTasks)
    .patch(patchTasks)
    .get(getTasksById)
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));