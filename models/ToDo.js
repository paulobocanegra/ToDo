const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        body:{
            type: String,
            required: true
        }
    },
    {
        timestamps:true
    }
)

module.exports = Todo = mongoose.model("Todo", TodoSchema);