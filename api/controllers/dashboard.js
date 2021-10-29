const User = require('../db/models/User')

exports.getDashboard = (req, res, next)=>{
    res.render('admin/dashboard',{
        pageTitle: 'Dashboard'
    })
}