const mongoose = require('/mongoose')
const { model, Schema } = require('mongoose')

const reactionSchema = new Schema({
   reactionId: {
       type: Schema.Types.ObjectId,
       default: () => new mongoose.Types.ObjectId()
   },
   reactionBody: {
       type: String,
       required: true,
       maxlength: 280
   },
   username: {
           type: String,
           required: true
   },
   createdAt: {
       type: Date,
       default: Date.now
   }
   
})
reactionSchema.virtual('formattedCreatedAt').get(function () {
   return this.createdAt.toISOString()
})

module.exports = Reaction

const thoughtSchema = new Schema({
   thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   username: {
      type: String,
      required: true
   },
   reactions: [reactionSchema],
})

thoughtSchema.virtual('formattedCreatedAt').get(function () {
   return this.createdAt.toISOString()
})

thoughtSchema.virtual('reactionCount').get(function () {
   return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought