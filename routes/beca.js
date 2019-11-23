var express = require('express');
var router = express.Router();
const BecaController = require("../controllers/becaController");

router.get('/:nombre/', BecaController.getOne);
router.get('/becas', BecaController.getAll);
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
router.post('/',BecaController.register);
router.put('/:nombre/', BecaController.update);
router.delete('/:nombre/',BecaController.delete);

module.exports = router;