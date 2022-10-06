const express = require("express")
const axios = require("axios")
const fs = require('fs')
const path = require('path')
const PORT = 5001 || 8000
const app = express()

const url = `https://jsonplaceholder.typicode.com/todos`
app.get("/api", async (req, res) => {
  axios
    .get(url)
    .then((e) => {
      const data = fs.readFileSync(path.resolve(__dirname, 'tasks.json'), {encoding: 'utf-8'})
      res.send(data)
    })
    .catch((error) => console.log(error))
})

app.delete("/api/:taskParams", (req, res) => {
  const {id} = req.params
  const data = fs.readFileSync(path.resolve(__dirname, 'tasks.json'), {encoding: 'utf-8'})
  const tasks = JSON.parse({data})
  const index = tasks.findIndex((t) => t.id===strInt(id))
  if(index >= 0){
    tasks.splice(index, 1)
    fs.writeFileSync(path.resolve(__dirname, 'tasks.json'), JSON.stringify(tasks))
    res.send('Deleted successfully')
  } else {
    res.status(404).send('Task is not in the server')
  }
})

app.put("/api/:taskParams", (req, res) => {
  const {id} = req.params
  const {title} = req.body
  const data = fs.readFileSync(path.resolve(__dirname, 'tasks.json'), {encoding: 'utf-8'})
  const tasks = JSON.parse({data})
  const task = tasks.find((t) => t.id == id)
  if(task!==undefined){
    task.title = title
    const Tasks = [...tasks]
    fs.writeFile(path.resolve(__dirname, 'tasks.json'), JSON.stringify(Tasks))
    res.send('Task updated')
  } else {
    res.status(404).send('Task not found')
  }
})

app.post("/api/:taskParams", (req, res) => {
  const payload  = JSON.parse(req.body)
  const data = fs.readFileSync(path.resolve(__dirname, 'tasks.json'), {encoding: 'utf-8'})
  const tasks = JSON.parse({data})
  const new_task=[...tasks, JSON.parse(payload)]
  fs.writeFileSync('./tasks.json', JSON.stringify(new_task))
  res.send('Task created')
})

app.get("/api/:taskParams", async ({params: {taskParams}}, res) => {
  const data = fs.readFileSync(path.resolve(__dirname, 'tasks.json'), {encoding: 'utf-8'})
  const tasks = JSON.parse({data})
  axios
    .get(`${url}?title=${taskParams}`)
    .then((event) => {
      res.json(event.
          data
      )
      res.send(tasks)
    })
    .catch((error) => console.log(error))
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
