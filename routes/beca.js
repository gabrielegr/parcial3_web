var express = require('express');
var router = express.Router();
const BecaController = require("../controllers/becaController");

/* GET All Becas */
router.get('/', BecaController.getAll);
router.get('/:id', BecaController.getOneById);

router.post('/insert', BecaController.insert);

router.put('/update', BecaController.update);

router.delete('/delete', BecaController.deleteById);
module.exports = router;