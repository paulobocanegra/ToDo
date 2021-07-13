const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const passport = require("passport")

const Todo = require("../../models/Todo")
const validateTodoInput = require('../../validations/todos')

// router.get("/test", (req, res) => res.json({msg: "This is the todos route"}));

router.get('/', (req, res) => {
    Todo.find()
        .sort({date: -1})
        .then(todos => res.json(todos))
        .catch(err => res.status(404).json({ notodosfound: "No todos were found"}))
})

router.get('/user/:user_id', (req, res) => {
    Todo.find({user: req.params.user_id})
        .then(todos => res.json(todos))
        .catch(err => res.status(404).json({ notodosfound: "No todos were found with this User"}))
})

router.get('./:id', (req, res) => {
    Todo.findById(req.params.id)
        .then(todos => res.json(todos))
        .catch(err => res.status(404).json( {notodosfound: "No todo with specified Id"}))
})

// router.post("/", passport.authenticate('jwt', {session: false}), (req, res) =>{
router.post("/", (req, res) =>{
    const {errors, isValid} = validateTodoInput(req.body);

    if(!isValid){
        return res.status(400).json(errors)
    }

    const newTodo = new Todo({
        title: req.body.title,
        body: req.body.body,
        user: req.user.id
    })

    newTodo.save().then(todo => res.json(todo))
})



module.exports = router