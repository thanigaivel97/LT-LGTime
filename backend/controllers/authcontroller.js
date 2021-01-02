const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.signup = (req, res, next) => {
    const name = req.body.body.name;
    const { lat, lon } = req.body.body
    console.log(req.body)
    const emailid = req.body.body.email;
    const password = req.body.body.password;
    console.log(password, "ddddddd");
    bcrypt.hash(password, 8).then(hashpwd => {
        console.log(hashpwd, "hashpass")
        const newuser = new user({
            name: name,
            emailid: emailid,
            password: hashpwd,
            lat,
            lon
        });
        return newuser.save();
    }).then(user => {
        res.status(200).json({ message: "user created ", userid: user._id, user: user });
    }).catch(err => {
        console.log(err);
        res.json({ message: "error", err: err });
    })

}

exports.login = (req, res, next) => {
    console.log(req.body)
    const emailid = req.body.body.email;
    const password = req.body.body.password; // front rnd
    console.log(emailid, password)
    let loadeduser;
    user.find({ emailid: emailid }).then(user => {
        if (!user) {
            res.status(401).json({ message: "user not found" });
        }
        console.log(user, "user");
        loadeduser = user[0];
        console.log(loadeduser)
        return loadeduser.password; //da=b
    }).then(pass => {
        console.log(pass, "pass");
        return bcrypt.compareSync(password, pass)
    }).then(isequal => {
        console.log(isequal, "isequal")
        if (!isequal) {
            return res.status(401).json({ message: "password mismatch" });
        }

        const token = jwt.sign({ emailid: loadeduser.emailid, userId: loadeduser._id },
            'thani', {
                expiresIn: '1h'
            }
        );
        res.status(200).json({ message: "succesfully logged in ", token: token, userid: loadeduser._id.toString() });
    }).catch(err => {
        console.log(err);
    })
}