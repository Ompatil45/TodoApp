import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

//get all the todos of a logged-in user
router.get('/', async (req,res) => {
   const todo = await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
})
    res.json(todos)
})

//create a new todo
router.post('/', async (req,res) => {
    const { task } = req.body

    const todo = await prisma.todo.create({
        data: {
            task,
            userId: req.userId
        }
    })

    res.json(todo)
})

//update a todo - we want id of the that specific todo to update it, so we will use the id as a parameter in the url
router.put('/:id', async (req,res) => {
    const { completed } = req.body
    const { id } = req.params //get the todo id, .params returns parameters from incoming requests

    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: req.userId
        },
        data: {
            completed: !!completed // !! gives a boolean value
        }
    })

    res.json(updatedTodo)
})

//delete a todo - here also,we will want id of that specific todo to delete it
router.delete('/:id', async (req,res) => {
    const { id } = req.params
    const userId = req.userId

    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId
         }
    })
    res.json({message: "Todo deleted"})

})

export default router
