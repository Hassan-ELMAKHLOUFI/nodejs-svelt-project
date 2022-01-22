var express = require('express');
var router = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const fs = require('fs');


router.get('/', async function (req, res, next) {
    let take = parseInt(req.query.take)
    let skip = parseInt(req.query.skip)
    const movies = await prisma.movies.findMany({
        skip: skip,
        take: take,
    })
    res.send({
        data: movies
    });

});

module.exports = router;