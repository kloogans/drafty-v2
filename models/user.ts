import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// @ts-expect-error
mongoose.models = {}

const User = mongoose.models["User"]
  ? mongoose.model("User")
  : mongoose.model("User", userSchema)

export default User
