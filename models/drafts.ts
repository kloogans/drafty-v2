import mongoose from "mongoose"
const Schema = mongoose.Schema

const draftsSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  drafts: {
    type: Array,
    required: true
  },
})

// @ts-expect-error
mongoose.models = {}

const Drafts = mongoose.models["Drafts"]
  ? mongoose.model("Drafts")
  : mongoose.model("Drafts", draftsSchema)

export default Drafts
