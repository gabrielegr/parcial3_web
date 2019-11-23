var Beca= require('../models/beca');
var debug = require('debug')('parcial3:user_controller');

// Search a one user y database
module.exports.getOne = (req, res, next) => {
    debug("Search Schoolarship", req.params);
    Beca.findOne({
            nombre: req.params.nombre
        }, "-password -login_count")
        .then((foundBeca) => {
            debug("Found Shoolarship", foundBeca);
            if (foundBeca)
                return res.status(200).json(foundBeca);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Schoolarship List", {
        size: perPage,
        page,
        sortby: sortProperty,
        sort
    });

    Beca.find({}, "-password -login_count")
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            [sortProperty]: sort
        })
        .then((becas) => {
            debug("Found users", becas);
            return res.status(200).json(becas)
        }).catch(err => {
            next(err);
        });

}

// New User

module.exports.register = (req, res, next) => {
    debug("New User", {
        body: req.body
    });
    Beca.findOne({
            nombre: req.body.nombre
        }, "-password -login_count")
        .then((foundBeca) => {
            if (foundBeca) {
                debug("Usuario duplicado");
                throw new Error(`Usuario duplicado ${req.body.nombre}`);
            } else {
                let newBeca = new Beca({
                    nombre: req.body.nombre,
                    fundacion: req.body.fundacion|| "",
                    tipo: req.body.tipo || "",
                    descripcion: req.body.descripcion || " 
                });
                return newBeca.save();
            }
        }).then(beca => {
            return res
                .header('Location', '/becas/' + beca.nombre)
                .status(201)
                .json({
                    nombre: beca.nombre
                });
        }).catch(err => {
            next(err);
        });
}


// Update user 

module.exports.update = (req, res, next) => {
    debug("Update Schoolarship", {
        nombre: req.params.nombre,
        ...req.body
    });

    let update = {
        ...req.body
    };

    User.findOneAndUpdate({
            nombre: req.params.nombre
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}

module.exports.delete = (req, res, next) => {

    debug("Delete Schoolip", {
        nombre: req.params.nombre,
    });

    Beca.findOneAndDelete({nombre: req.params.nombre})
    .then((data) =>{
        if (data) res.status(200).json(data);
        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}