const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.headers)
    const authheader = req.headers['authorization'];
    console.log(authheader)


    if (typeof authheader != undefined) {

        const token = authheader.split(' ')[1];

        const tokennew = token;
        console.log(req.body, "---------")
        const decodedtoken = jwt.verify(tokennew, 'thani');
        console.log(decodedtoken)
        req.body.user_id = decodedtoken.userId;


        next();
    } else {
        res.json({ message: "No Token Found" })

    }

}