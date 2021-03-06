const ShortUrl = require('../models/Url')
const shortId = require('shortid')
exports.getIndex = (req, res, next) => {
    ShortUrl.find()
    .then(urls => {
        res.render('index',{
            pageTitle: 'Home',
            data: urls,
            path: '/'
        })
    })
    
}

exports.getAbout = (req, res, next) => {
    res.render('about', {
        pageTitle: 'About',
        path: '/about-us'
    })
}
exports.getData = (req, res, next) => {
    ShortUrl.find()
    .then(urls => {
        res.json({data: urls})
    })
}
exports.getSuccess = ( req, res, next) => {
    const url = req.params.url
    res.render('success', {
        shorten_url: url,
        pageTitle: 'Success',
        path: '/sucess'
    })
}
exports.shortenUrl = (req, res, next) => {
    const preffered_url = req.body.preffered_url
    var shorten_url = req.body.preffered_url
    if(preffered_url.length === 0){
        shorten_url = shortId.generate()
    }
    const original_url = req.body.original_url
    if(req.session.user!==undefined){
        const url = new ShortUrl({
            original_url: original_url,
            shorten_url: shorten_url,
            clicks: 0,
            by: req.session.user._id
        })
        console.log(url);
        url.save();
        res.redirect('/links')
    }else if(req.session.user===undefined){
        const url = new ShortUrl({
            original_url: original_url,
            shorten_url: shorten_url,
            clicks: 0,
        })
        console.log(url);
        url.save();
        res.redirect('/success/'+shorten_url)
    }
}

exports.clickUrl = ( req, res, next) => {
    const shorten_url = req.params.url;
    ShortUrl.findOne({shorten_url:shorten_url}).then(url=>{
        if(url!==null){
            url.clicks++;
            url.date = new Date();
            url.save()
            return res.redirect(url.original_url)
        }
    }).catch(err => console.log(err));
}