const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja')

//get a list of ninjas from db
router.get('/ninjas',function(req, res, next) {
    // ninja.find({}).then(function(ninjas) {
    //   res.send(ninjas);
    // })
    Ninja.aggregate([
       {
           $geoNear: {
               near: {
                   type: 'Point',
                   coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
               },
               distanceField: "dist.calculated",
               maxDistance: 100000,
               spherical: true
           }
       }
   ]).then(function(ninjas){
        if(ninjas.length>=1){
            res.status(200).json(ninjas)
        }else{
            res.status(422).json({message:'no ninjas'})
        }
   }).catch(next);
});﻿


//add a new ninja in the db
router.post('/ninjas',function(req, res, next) {
    Ninja.create(req.body).then(function(ninja) {
            res.send(ninja);
    }).catch(next)
});


//update a ninja in db
router.put('/ninjas/:id',function(req, res, next) {
    Ninja.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
      Ninja.findOne({_id:req.params.id}).then(function(ninja){
        res.send(ninja);
      });
    })
    // res.send({type:'PUT'})
});

//delte a ninja from the db
router.delete('/ninjas/:id',function(req, res, next) {
    // console.log(req.params.id);
    Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja) {
      res.send(ninja);
    })
    res.send({type:'DELETE'})
});

module.exports = router;
