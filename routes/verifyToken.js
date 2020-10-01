const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ msg: 'Access Denied' })

    // try {
    //     const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    //     // Set the payload to request user so it could be accessd
    //     req.user = verified
    //     next()
    // } catch (err) {
    //     res.status(400).json({ msg: 'Invalid Token' })
    // }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

