const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    name: { type: String },
    priority: { type: String },
    expire: { type: Date },
    ownerid: { type: String }
});

module.exports = model("Task", TaskSchema);