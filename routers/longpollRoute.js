const { longPollController } = require('../controllers/longpollController');

const router = require('express').Router();



router.get('/data', longPollController)


module.exports = router;