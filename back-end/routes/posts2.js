const router = require('express').Router();
const verifyToken = require('./verifyToken');

router.get('/', verifyToken, (req, res) => {
    //const user = User.findbyOne({_id: req.user})
    //return res.status(200).send(user);

    return res.status(200).send({
        "data": {
            "name" : "name1",
            "stt": 1
        }
    });
})
module.exports = router;