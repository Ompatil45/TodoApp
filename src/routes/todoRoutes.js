import express from 'express'
import db from '../db.js'

const router = express.Router()

//get all the todos of a logged-in user
router.get('/', (req,res) => {})

//create a new todo
router.post('/', (req,res) => {})

//update a todo - we want id of the that specific todo to update it, so we will use the id as a parameter in the url
router.put('/:id', (req,res) => {})

//delete a todo - here also,we will want id of that specific todo to delete it
router.delete('/:id', (req,res) => {})

export default router
