// external module import
const express = require('express')
const db = require('./data/db.js')
const app = express()

// routing
app.route('/api/folder')
  .get(async (req, res) => {
    const result = {success: true}
    try {
      const json = await db.getData()
      result.data = json.folder
    } catch (err) {
      result.success = false
      result.err = err
    }
    res.json(result)
  })
  .post(async (req, res) => {
    const result = {success : true}
    const folder = req.body.folder
    try{
      const json = await db.getData()
      json.folder = folder
      await db.setData(json)
    } catch (err) {
      result.success = false
      result.err = err
    }
  })

// register middleware
app.use(express.json())
app.use(express.static("public"))
app.listen(3000)