const router = require('express').Router();
const { validate } = require('express-validation')
const USER_CONTROLLER = require('../controller/users');
const { isAuth } = require('../middlewares/authentication');
const { login, register, send_mail } = require('../validations/users');

router.post('/login', validate(login, { context: true }), USER_CONTROLLER.login)
router.post('/register', validate(register, { context: true }), USER_CONTROLLER.register)
router.post('/mail/send', isAuth(), validate(send_mail, { context: true }), USER_CONTROLLER.sendMail)
router.get('/mail/outbox', isAuth(), USER_CONTROLLER.outbox);
router.get('/mail/inbox', isAuth(), USER_CONTROLLER.inbox);

module.exports = router;