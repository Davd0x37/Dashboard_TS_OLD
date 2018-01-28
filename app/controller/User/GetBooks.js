import fs from "fs"
import { promisify } from "util"

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const file = "./app/controller/User/Book.json"

export const books = readFile(file)
  .then(data => JSON.parse(data))
  .catch(err => console.log(err))

export const addBook = (title, author) => {
  books.then(data => {
    data.push({ title, author })
    console.log(JSON.stringify(data))
    writeFile(file, JSON.stringify(data)).catch(err => new Error(err))
  })
}
