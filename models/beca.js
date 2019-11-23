const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    fundacion:String,
    tipo:String,
    descripcion:String,
});

module.exports = mongoose.model("Beca", PostSchema);