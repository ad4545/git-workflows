const shortid = require('shortid')

const URL_MODEL = require('../models/url')



async function urlHandler(req,res){
    const body = req.body;
    const {url} = body;
    const shortId = shortid(8);
    await URL_MODEL.create({
        shortId,
        redirectURL:url,
        visitHistory:[]
    })

    res.status(201).json({id:shortId})
}

// Description: get the URL -> generate a custom id -> Create an entry in database according to Schema.

async function analyticsHandler(req,res){
    const id = req.params.id
    const result = await URL_MODEL.findOne({shortId:id})
    res.status(201).json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}

// Description : Get the custom id -> Find the entry -> send the analytics as clicks.

module.exports = {
    urlHandler,
    analyticsHandler
}