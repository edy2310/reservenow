var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Reservations = require('../models/reservation');

//POST
router.post('/', async (req, res)=>{
    let data = req.body;
    if (data.token != 'reservationPage') {
        res.json({
            'code': '401',
            'msg': 'unauthorized'
        });
    }
    let newReservation = Reservations.build(
        {
            name: data.name,
            secondName: data.secondName,
            numberPersons: data.numberPersons,
            email: data.email,
            phone: data.phone,
            date: data.date,
            time: data.time,
            specialRequest: data.specialRequest
        }
    );
    let saveResp = await newReservation.save();
    res.json({
        'code': '200',
        'msg': 'data received'
    });
});

//GET
router.post('/getReservations', async (req, res)=>{
    let tokenRec = req.body.token;
    let token = jwt.verify(tokenRec, 'Soft Kitty');
    if (!token.user) {
        res.json({
            'code': '401',
            'msg': 'unauthorized'
        });
    }
    let allReservations = await Reservations.findAll();
    res.send(allReservations);
});

//Delete
router.post('/delete', async (req, res)=>{
    let token = req.body.token;
    if(!token.user){
        res.json({
            'code': '401',
            'msg': 'unauthorized'
        });
    }
    let idRec = req.body.id;
    let deleteAns = Reservations.destroy({
        where: {
            id: idRec
        }
    });
    res.send(deleteAns);
});

module.exports = router;