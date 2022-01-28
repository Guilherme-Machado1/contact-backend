const router = require('express').Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.show);
router.get('/:id', contactController.showById);
router.post('/create', contactController.store);
router.put('/edit/:id', contactController.edit);
router.delete('/delete/:id', contactController.delete);

module.exports = router;
