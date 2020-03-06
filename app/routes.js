const express = require('express');
//connect to database
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser:true});
const Database = require("./database");

//API Routes

let router = express.Router();

//middleware
router.use((req,res,next) => {
    console.log('I am middleware.');
    next();
})

//test router
router.get('/', (req,res) => {
    res.json({ sequence: ['b1','b2', 'b3', 'b4']});
});


//access all databases
router.route('/database')
    //create a new database
    .post((req,res) => {
    
    const newDatabase = new Database();
    console.log(req);
    newDatabase.name = req.body.name;
    newDatabase.sequence = req.body.sequence;

        newDatabase.save((err) => {
            if(err){
                res.send(err);
            }
            res.send({
                data: req.body
            });
        })
    })
    //get all databases
    .get((req,res) => {
        Database.find((err,sequences) => {
            if(err){
                res.send(err);
            }
            res.json(sequences);
        })
    })
    .delete((req,res) => {
       Database.remove((err) => {
          if(err){ 
            res.send(err);
          }
          res.send({message: "All data gone"});
        });  
    })
    
//access one database
router.route('/database/:database_id')
     
      .get((req, res) => {
          Database.findById(req.params.database_id, (err, database) =>{
              if(err){
                  res.send(err);
              }
              res.json(database);
          })
      })
      .put((req,res) => {
        Database.findById(req.params.database_id, (err, database) =>{ 
          if(err){
                res.send(err)
            }
            database.name = req.body.name;
            database.sequence = req.body.sequence;
            database.save((err) => {
                if (err){
                    res.send(err);
                }
                res.send({ message: 'Database updated' });
            })
        })
    })
      .delete((req,res) => {
          Database.remove({
              _id: req.params.database_id
          },(err) => {
            if(err){
                res.send(err)
            }
            res.json({message: 'Database gone.'})
          })
      })



module.exports = router;

  