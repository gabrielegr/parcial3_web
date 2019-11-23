const Beca = require("../models/beca")

/**
 * METHOD = POST
 * BODY:{
 *      carnet:String,
 *      schedule: String,
 *      isLate: Boolean,
 *      datetime: Date
 * }
 */
module.exports.insert = (req, res)=>{
    

    if(!req.body.nombre || !req.body.fundacion || !req.body.tipo){
        return res.status(400).json({
            message: "There are missing fields",
        });
    }
    
    let beca = new Beca(
        req.body
    );


    beca.save((err, nBeca)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to insert Register",
        });

        res.status(200).json({
            message: "Insert registration was successful",
            beca: nBeca
        });
    })
}

/**
 * METHOD = PUT
 * BODY:{
 *      _id: mongoose.Schema.Types.ObjectId
 *      carnet:String,
 *      schedule: String,
 *      isLate: Boolean,
 *      datetime: Date
 * }
 */
module.exports.update = (req, res)=>{
    let beca = req.body
    console.log(beca)
    //console.log(register._id);
    

    if(!beca.nombre){
        return res.status(400).json({
            message: "id is needed",
        }); 
    }

    Beca.update({nombre: beca.nombre}, beca)
        .then(value =>{
            res.status(200).json({
                message: "update register was successful"
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Something happend trying to update the Register"
            });
        })

}

module.exports.deleteById = (req, res)=>{
    let beca = req.body;

    if(!beca.nombre){
        return res.status(400).json({
            message: "id is needed",
        }); 
    }

    Beca.deleteOne({nombre:beca.nombre})
        .then(deleted=>{
            res.status(200).json({
                message: "delete register was successful"
            });
        })
        .catch(err=>{
            res.status(500).json({
                message: "Something happend trying to delete the Register"
            });
        })
}

/**
 * METHOD = GET
 */
module.exports.getAll = (req, res)=>{
    
    Beca.find((becas,err )=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to get the Register",
        });

        if(becas){
            res.status(200).json(becas);
        }else{
            res.status(404).json({
                message: "There isn't any register",
            });
        }
    });
}

/**
 * METHOD = GET
 * Params -> id
 */
module.exports.getOneById = (req, res)=>{
    let nombre = req.params.nombre; 
    console.log(req)
    Beca.findById(nombre, (err, beca)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to get all Registers",
        });

        if(beca){
            res.status(200).json(beca);
        }else{
            res.status(404).json({
                message: `There is not a register with id ${nombre}`,
            });
        }
    });  
}

module.exports.panic = (req, res)=>{
    Becas.deleteMany({}, (err)=>{
        res.status(200).send("F en el chat");
    });
}
