const express = require('express')
const { Manager, Schedule, Classroom, Block, Address, Relatory } = require ('./models')
const jwt = require('jsonwebtoken')
const router = express.Router()
const auth = require('../auth')
const { Router } = require('express')

// Manager
router.get('/', async(req, res) => {
    res.send(await Manager.FindAll({include: [Schedule, Classroom, Block, Relatory]}))
})

router.post('/', async(req, res) => {
    res.status(200).send(await Manager.create(req.body))
})

router.get('/:id', async (req, res) => {
    res.send(await Manager.findByPk(req.params.id))
})

router.put('/:id', async (req,res) => {
    let manager = await Manager.findByPk(req.params.id, {include: [Schedule, Classroom, Block, Relatory]})
    manager.set(req.body)
    await manager.save()
    res.send(manager)
})

router.delete('/:id', async (req, res) => {
    (await Manager.findByPk(req.params.id)).destroy()
    res.status(200).send('OK')
})

module.exports = router