import mongoose from "mongoose"
const Schema = mongoose.Schema

const permissionSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  permissions: {
    type: Array,
    required: true
  }
})

// @ts-expect-error
mongoose.models = {}

const Permissions = mongoose.models["Permissions"]
  ? mongoose.model("Permissions")
  : mongoose.model("Permissions", permissionSchema)

export default Permissions
