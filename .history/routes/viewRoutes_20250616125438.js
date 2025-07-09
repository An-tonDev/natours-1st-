const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.showall);
router.get('/overview', viewsController.showOverview);
router.get('/tour', viewsController.showTour);

module.exports = router;
