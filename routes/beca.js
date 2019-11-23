var express = require('express');
var router = express.Router();
const BecaController = require("../controllers/becaController");


router.get('/:nombre', BecaController.getOneById);
router.get('/becas/', BecaController.getAll);
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Becas Uca' });
  });
router.post('/',BecaController.insert);
router.put('/:nombre', BecaController.update);
router.delete('/:nombre',BecaController.deleteById);
router.delete('/deleteall/',BecaController.panic);

module.exports = router;
