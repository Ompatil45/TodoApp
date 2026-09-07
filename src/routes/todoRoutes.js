import express from 'express'
import db from '../db.js'

const router = express.Router()

//get all the todos of a logged-in user
router.get('/', (req,res) => {
    const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id=?`)
    const todos = getTodos.all(req.userId) //req.userId is the id of the logged-in user, which we will get from the token in the auth middleware
    res.json(todos)
})

//create a new todo
router.post('/', (req,res) => {
    const { task } = req.body

    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES(?, ?)`)
    const result = insertTodo.run(req.userId, task)

    res.json( { id: result.lastInsertRowid, task, completed: 0} ) //completed is 0 because when we create a new todo, it is not completed yet
})

//update a todo - we want id of the that specific todo to update it, so we will use the id as a parameter in the url
router.put('/:id', (req,res) => {
    const { completed } = req.body
    const { id } = req.params //get the todo id, .params returns parameters from incoming requests

    const updateTodo = db.prepare(`UPDATE todos SET completed=? WHERE id=?`)
    updateTodo.run(completed, id)

    res.json({message: "Todo completed" })
})

//delete a todo - here also,we will want id of that specific todo to delete it
router.delete('/:id', (req,res) => {
    const { id } = req.params
    const userId = req.userId

    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id=? AND user_id=? `)  //we also used user_id to make sure that the todo from correct user is being deleted
    deleteTodo.run(id, userId)
    res.json({message: "Todo deleted"})

})

export default router
