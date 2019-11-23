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
const insert = (req, res)=>{
    /**
     * Para ver el funcionamiento de req.body hacer:
     * console.log(req.body);
     */
    
    let beca = new Beca(
        req.body
    );

    beca.save((err)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to insert beca",
        });

        res.status(200).json({
            message: "Insert registration was successful"
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
const update = (req, res)=>{
    let beca = req.body
    
    //console.log(beca._id);
    

    if(!beca._id){
        return res.status(400).json({
            message: "id is needed",
        }); 
    }

    Beca.update({_id: beca._id}, beca)
        .then(value =>{
            res.status(200).json({
                message: "update beca was successful"
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Something happend trying to update the beca"
            });
        })

}

const deleteById = (req, res)=>{
    let beca = req.body;

    if(!beca._id){
        return res.status(400).json({
            message: "id is needed",
        }); 
    }

    Beca.deleteOne({_id:beca._id})
        .then(deleted=>{
            res.status(200).json({
                message: "delete beca was successful"
            });
        })
        .catch(err=>{
            res.status(500).json({
                message: "Something happend trying to delete the beca"
            });
        })
}

/**
 * METHOD = GET
 */
const getAll = (req, res)=>{
    Beca.find((err, becas)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to get the beca",
        });

        if(becas){
            res.status(200).json(becas);
        }else{
            res.status(404).json({
                message: "There isn't any becas",
            });
        }
    });
}

/**
 * METHOD = GET
 * Params -> id
 */
const getOneById = (req, res)=>{
    let id = req.params.id; 

    Beca.findById(id, (err, beca)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to get all becas",
        });

        if(beca){
            res.status(200).json(beca);
        }else{
            res.status(404).json({
                message: `There is not a beca with id ${id}`,
            });
        }
    });  
}

module.exports = {
    insert,
    update,
    deleteById,
    getAll,
    getOneById,
}