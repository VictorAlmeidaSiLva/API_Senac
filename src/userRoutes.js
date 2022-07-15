// /user
const express = require('express')
const { User, WineMenu, Rating } = require('../models')
const jwt = require('jsonwebtoken')
const router = express.Router()
const auth = require('../auth')
const { Router } = require('express')

router.get('/', async (req, res) => {
  res.send(await User.findAll({include: WineMenu, Rating}))
})

router.post('/', async(req, res) => {
  res.status(200).send(await User.create(req.body))
})

router.get('/:id', async (req, res) => { 
  res.send(await User.findByPk(req.params.id))
})

router.put('/:id', async (req, res) => {
  let user = await User.findByPk(req.params.id, {include: WineMenu, Rating})
  user.set(req.body)
  await user.save()
  res.send(user)
})

router.delete('/:id', async (req, res) => {
  (await User.findByPk(req.params.id)).destroy()
  res.status(200).send('OK')
})

router.post('/login', async (req, res) => {
  const {user, password} = req.body

  const logged = User.checkLogin(user, password)

  if(logged == null) {
    res.status(401).send('User and/or Password is invalid.')
  } else {
    const token = jwt.sign({user_id: user.id}, process.env.TOKEN_SECRET)
    res.send({user, password})
  }
})

router.post('/logout', (req, res) => {
  res.json({auth: false, token: null})
})

module.exports = router