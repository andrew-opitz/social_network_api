const router = require('express').Router()

const User = require('../models/User')

router.get('/', async (req, res) => {
    const users = await User.find()

    res.json(users)
})

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId
    const user = await User.findById(userId)
    res.json(user)
})

router.post('/', async (req, res) => {
    const userData = req.body
    try {
        const newUser = await User.create(userData)

        res.json(newUser)

    } catch (error) {
        console.log(error)

    }

})

router.put('/:userId', async (req, res) => {
    const userId = req.params.userId
    const { username } = req.body

    try {

        const updatedUser = await User.findByIdAndUpdate(userId, { username }, { new: true })

        res.json(updatedUser)

    } catch (error) {
        console.error(error)
    }
})

router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId
    try {
        const deleteUser = await User.findByIdAndDelete(userId)


        res.json(deleteUser)

    } catch (error) {
        console.log(error)
    }
})

// USERS FRIENDS ROUTES
router.post('/:userId/friends/:friendId', async (req, res) => {
    const userId = req.params.userId
    const friendId = req.params.friendId

    try {
        const user = await User.findById(userId)

        user.friends.push(friendId)

        await user.save()

        res.json(user)

    } catch (error) {

        console.log(error)

    }
})

router.delete('/:userId/friends/:friendId', async (req, res) => {
    const userId = req.params.userId
    const friendId = req.params.friendId

    try {
        const user = await User.findById(userId)

        const friendArray = user.friends.indexOf(friendId)

        const removeFriend = user.friends.splice(friendArray, 1)

        await user.save()

        res.json(removeFriend)

    } catch (error) {
        console.log(error)
    }
})


module.exports = router