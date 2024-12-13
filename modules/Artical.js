
const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const atricleSchema= new Schema({
    user: String,
    pass: String,
    students: [{name : String, number: Number, field: String, age: Number, height: Number, nationality: String}],
    courses: [{name: String, code: Number, numberOfHours: Number}]
})

const Artical= mongoose.model("Artical", atricleSchema);

module.exports= Artical;