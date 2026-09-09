import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'
import prisma from '../prismaClient.js'

const router = express.Router()

router.post('/register', async (req,res) => {
    const { username,password } = req.body //to get the body of incoming request

    

    //encrypt the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 8)
    
    //save the new user into the database
    try{
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })
        

            //give a default todo new user
            const defaultTodo = `Hello! Add your first todo`
            await prisma.todo.create({
                data: {
                    task: defaultTodo,
                    userId: user.id
                }
            })

            //generate a jwt token for the new user
            const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: '24h' })
            res.json({ token }) //send the token back to the client

    } catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }



    
    

})

router.post('/login', async (req,res) => {
    const { username, password } = req.body
    try{
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
       

        if(!user){return res.status(404).send({ message: "User not found"})}

        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if(!passwordIsValid){return res.status(401).send({ message: 'Invalid Password' })}

        const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: '24h'})
        res.json({ token })

    } catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
    
})

export default router