var express = require('express');
var router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const UsersController = require('../controllers/users');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, req.body.firstname + '_' + file.originalname);
    }
});

const upload = multer({storage: storage});

router.get('/', UsersController.getAllUsers);

router.get('/:userid', UsersController.getUser);

router.put('/:userid', checkAuth, upload.single('displayimage'), UsersController.updateUser);

router.post('/', upload.single('displayimage'), UsersController.addUser);

router.post('/login', UsersController.login);

router.delete('/:userid', checkAuth, UsersController.deleteUser);

module.exports = router;