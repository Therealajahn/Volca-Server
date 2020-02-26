const express = require('express');

//API Routes

let router = express.Router();

//middleware
router.use((req,res,next) => {
    console.log('I am middleware.');
    next();
})

//test router
router.get('/', (req,res) => {
    res.json({ message: "Sometimes we don't know how it be, but it do. -Bigideas"});
});

module.exports = router;