// Importar modulos externos
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from 'cors'
import mongoose from 'mongoose'

import bodyParser from 'body-parser'
const {json} = bodyParser

// Importar modulos internos de nuestro proyecto
import userRouter from "./src/users/user.router.js";
import groupRouter from "./src/groups/group.router.js";
import messageRouter from "./src/messages/message.router.js"
import contactRouter from "./src/contacts/contact.router.js";
import chatRouter from "./src/chats/chat.router.js";

const app = express()

const PORT = process.env.PORT || 3001
const URI = process.env.ATLAS_URI

// Middlewars
app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(json())

app.use('/api/v1/chat/users', userRouter)
app.use('/api/v1/chat/groups', groupRouter)
app.use('/api/v1/chat/messages', messageRouter)
app.use('/api/v1/chat/contacts', contactRouter)
app.use('/api/v1/chat/chats', chatRouter)


app.listen(PORT, () => {
  console.log('Server listen on port:', PORT)
})

mongoose.connect(URI, {
})
.then(() => console.log('MongoDB connection established'))
.catch((err) => console.log('MongoDB connection failed: ', err.message))