const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModels')

// @desc Get goals
// @route GET /api/goals
// @access PRIVATE

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

// @desc Set goal
// @route GET /api/goals
// @access PRIVATE

const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.name && !req.body.email && !req.body.phone) {
        res.status(400)
        throw new Error('Please provide a text')
    }
    const goal = await Goal.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    })
    res.status(200).json(goal)
})

// @desc Update goals
// @route PUT /api/goals:id
// @access PRIVATE

const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
})


//@desc DELETE goals
//@route Delete /api/goals:id
// @access PRIVATE

const deleteGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findByIdAndDelete(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    // await goal.findByIdAndDelete()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
