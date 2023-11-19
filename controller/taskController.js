const Todo = require('../models/Todo');

exports.getTasksController = async (req, res)=>{

    try{
        const {todoId} = req.params;
        const checkTodoExists = await Todo.findById(todoId);
        if(!checkTodoExists)
            throw new Error("no such todo exists");
        
        const todo = await Todo.findById(todoId);
        const tasks = todo.tasks;
        res.status(200).json({
            success: true,
            message: "tasks successfully retrieved",
            tasks
        })
    }
    catch(err){
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }

}

exports.addTaskController = async (req, res)=>{
    try{

        const {todoId} = req.params;
        const checkTodoExists = await Todo.findById(todoId);
        if(!checkTodoExists)
            throw new Error("no such todo exists");
        
        const todo = await Todo.findById(todoId);

        todo.tasks.push({main: req.body.main, taskupdatedAt:new Date()});
        const savedTask = await Todo.findByIdAndUpdate(todoId, todo);
        res.status(200).json({
            success: true,
            message: "tasks successfully added",
            todo
        })
    }
    catch(err){
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}

exports.checkUnCheckTaskController = async (req, res)=>{
    try{
        
        const {todoId, taskId} = req.params;
        const checkTodoExists = await Todo.findById(todoId);
        if(!checkTodoExists)
         throw new Error("no such todo exists");
         
        const todo = await Todo.findById(todoId);
        const checkTaskExist = todo.tasks.filter(e=>e._id==taskId);

        if(checkTaskExist.length==0)
         throw new Error("no such task exists");

        const updatedTasks = todo.tasks.map(e=>{
            if(e._id==taskId){
                if(e.checked){
                    e.checked = false;
                }
                else{
                    e.checked = true;
                }
                return e;
            }
            
            else
                return e;
            
        })

        todo.tasks = updatedTasks;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo);


        res.status(200).json({
            success: true,
            message: "tasks successfully checked/unchecked",
            todo
        })

    }
    catch(err){
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}

exports.editTaskController = async (req, res)=>{
    try{

        const {todoId, taskId} = req.params;
        console.log(req.user)
        const checkTodoExists = await Todo.findById(todoId);
        if(!checkTodoExists)
         throw new Error("no such todo exists");
         
        const todo = await Todo.findById(todoId);
        const checkTaskExist = todo.tasks.filter(e=>e._id==taskId);

        if(checkTaskExist.length==0)
         throw new Error("no such task exists");



        const updatedTasks = todo.tasks.map(e=>{
            if(e._id==taskId){
                e.main = req.body.main;
                e.taskupdatedAt = new Date()
                return e;
            }
            
            else
                return e;
            
        })

        todo.tasks = updatedTasks;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo);


        res.status(200).json({
            success: true,
            message: "tasks successfully checked/unchecked",
            todo
        })
    }
    catch(err){
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }

}



exports.deleteTaskController = async (req, res)=>{
    try{
        const {todoId, taskId} = req.params;
        const checkTodoExists = await Todo.findById(todoId);
        if(!checkTodoExists)
         throw new Error("no such todo exists");
         
        const todo = await Todo.findById(todoId);
        const checkTaskExist = todo.tasks.filter(e=>e._id==taskId);

        if(checkTaskExist.length==0)
         throw new Error("no such task exists");

        const updatedTasks = todo.tasks.filter(e=>e._id!=taskId)

        todo.tasks = updatedTasks;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo);


        res.status(200).json({
            success: true,
            message: "tasks successfully deleted",
            todo
        })
    }
    catch(err){
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}