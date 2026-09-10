import { DatabaseSync } from 'node:sqlite'
const db = new DatabaseSync(':memory:')

//Execute SQL statements from strings
//we will create 2 seperate tables,one for user data and one for todo app data related to the specific user

db.exec(`
    CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
    
    )`)

db.exec(`
    CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    task TEXT,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
    )`)

export default db