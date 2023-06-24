const Controller = require('../controllers');
const authentication = require('../middlewares/authentication');
const { approvalAuthorization } = require('../middlewares/authorization');

const router = require('express').Router()




router.post('/login', Controller.login )

router.use(authentication )
router.post('/epresence', Controller.createEpresence )
router.get('/epresence', Controller.findAllEpresence)
router.post('/approve/:id',approvalAuthorization,Controller.approve)




module.exports = router