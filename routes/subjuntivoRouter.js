const express = require('express')
const router = express.Router()

const Subjuntivo = require('../models/subjuntivoSchema')

// Home Route

router.get('/', (req, res) => {
    res.send('Hello world')
})

// Read Route 

router.route('/api/subjuntivo/read',)
.get(async (req, res) => {
    try {
        const subjuntivo = await Subjuntivo.find()
        res.send(subjuntivo)
    } catch (error) {
        res.send(`There has been an error:\n\n${error} in GET`)
    }
})

// Create Route

router.route('/api/subjuntivo/create',)
.get(async (req, res) => {
    res.send('To build out create form page')
})
.post(async (req, res) => {
    const newSubjuntivo = new Subjuntivo({
        title: req.body.title,
        auth: req.body.auth,
        markdown: req.body.markdown
    })
    try {
        const subjuntivoPost = await newSubjuntivo.save()
        res.send(`Successfully created:\n\n${newSubjuntivo}`)
    } catch (error) {
        res.send(`There has been an error in CREATE:\n\n${error}`)
    }
})

// Update Route

router.route('/api/subjuntivo/update/:id',)
.get(async (req, res) => {
    try {
        const subjuntivoPost = await Subjuntivo.findOne({ _id: req.params.id })
        res.send(subjuntivoPost)
    } catch (error) {
        res.send(`No post has been found with the ID: ${id}\n\n${error}`)
    }
})
.post(async (req, res) => {
    try {
        const subjuntivoPost = await Subjuntivo.updateOne({ _id: req.params.id }, { $set: req.body })
        res.send(`Successfully updated\n\n${subjuntivoPost}`)
    } catch (error) {
        res.send(`There has been an error in UPDATE:\n\n${error}`)
    }
})

// Delete Route

router.route('/api/subjuntivo/delete/:id',)
.post(async (req, res) => {
    try {
        const subjuntivoPost = await Subjuntivo.deleteOne({ _id: req.params.id })
        res.send("Deletion Successful.")
    } catch (error) {
        res.send(`There has been an error in DELETE:\n\n${error}`)
    }
})

module.exports = router