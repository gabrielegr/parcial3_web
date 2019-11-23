var Beca = require("../models/beca");
var debug = require("debug")("parcial3:post_controller");

module.exports.getOne = (req, res, next) => {
  debug("Buscar Beca", req.params.nombre);

  Beca.findByNombre(req.params.nombre)
    .then(post => {
      debug("Resultado:", post);
      if (post) return res.status(200).json(post);
      else return res.status(400).json(null);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.create = (req, res, next) => {
  debug("Crear Beca");
  Beca.findOne({
    nombre: req.body.nombre
  })
    .then(Beca => {
      if (!beca) {
        throw new Error("La beca no existe");
      } else {
        let beca = new Beca({
          nombre: req.body.nombre,
          fundacion: req.body.fundacion,
          tipo: req.body.tipo,
          descripcion: req.body.descripcion
        });

        return beca.save();
      }
    })
    .then(beca => {
      debug(beca);
      return res
        .header("Location", "/beca/" + beca.nombre)
        .status(201)
        .json({
          nombre: beca.nombre,
          _id: beca._id
        });
    })
    .catch(err => {
      next(err);
    });
};

module.exports.find = (req, res, next) => {
  var perPage = Number(req.query.size) || 10,
    page = req.query.page > 0 ? req.query.page : 0;

  debug("Lista de Becas", {
    size: perPage,
    page,
    search: req.params.search
  });

  var filter = {
    state: {
      $ne: "draft"
    }
  };

  if (!req.listPost) {
    filter = {
      ...filter,
      $or: [
        {
          $text: {
            $search: req.params.search
          }
        },
        {
          tags: {
            $regex: `${req.params.search}`
          }
        }
      ]
    };
  }

  debug("Filter With", filter);

  Post.find()
    .where(filter)
    .limit(perPage)
    .skip(perPage * page)
    .then(posts => {
      debug("Count post", posts.length);
      return res.status(200).json(posts);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.update = (req, res, next) => {
  debug("Actualizar beca", req.params.nombre);

  let update = {
    ...req.body
  };

  Post.findByNombreAndUpdate(req.params.nombre, update)
    .then(updated => {
      if (updated) return res.status(200).json(updated);
      else return res.status(400).json(null);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.delete = (req, res, next) => {
  debug("Borrar beca", req.params.nombre);

  Post.findByNombreAndDelete(req.params.nombre)
    .then(data => {
      if (data) res.status(200).json(data);
      else res.status(404).send();
    })
    .catch(err => {
      next(err);
    });
};
