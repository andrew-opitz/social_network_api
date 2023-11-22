const router = require('express').Router()

const Thought = require('../models/Thought')
const User = require('../models/User')

router.get('/', async (req, res) => {
    const thoughts = await Thought.find()

    res.json(thoughts)
})

router.get('/:thoughtId', async (req, res) => {
    const thoughtId = req.params.thoughtId
    const thought = await Thought.findById(thoughtId)

    res.json(thought)
})

router.post('/', async (req, res) => {
    const thoughtData = req.body

    try {
        const newThought = await Thought.create(thoughtData)

        const attachedUser = await User.findById(thoughtData.userId)

        attachedUser.thoughts.push(newThought)

        attachedUser.save()

        res.json(newThought)

    } catch (error) {
        console.log(error)
    }
})

router.put('/:thoughtId', async (req, res) => {
    const thoughtId = req.params.thoughtId
    const { thoughtText } = req.body

    try {
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true })

        res.json(updatedThought)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:thoughtId', async (req, res) => {
    const thoughtId = req.params.thoughtId

    try {
        const deleteThought = await Thought.findByIdAndDelete(thoughtId)

        res.json(deleteThought)
    } catch (error) {
        console.log(error)
    }
})

// ROUTES FOR REACTIONS
router.post('/:thoughtId/reactions', async (req, res) => {
    const thoughtId = req.params.thoughtId
    const reactionData = req.body

    try {
        const thought = await Thought.findById(thoughtId)

        thought.reactions.push(reactionData)

        await thought.save()

        res.json(thought)



    } catch (error) {
        console.log(error)
    }
})

router.delete('/:thoughtId/reactions', async (req, res) => {
    const thoughtId = req.params.thoughtId
    const reactionId = req.body

    try {
        const thought = await Thought.findById(thoughtId)

        const reactionArray = thought.reactions.indexOf(reactionId)

        const removeReaction = thought.reactions.splice(reactionArray, 1)

        await thought.save()

        res.json(removeReaction)

    } catch (error) {
        console.log(error)
    }
})


module.exports = router