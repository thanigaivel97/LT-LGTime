const postDb = require('../models/post')
const userDb = require('../models/user');


exports.create = async(req, res, next) => {
    let {
        user_id,
        postTitle,
        postImage,
        lat,
        lon
    } = req.body
    console.log(req.body)
    try {

        const post = await new postDb({
            user_id,
            postTitle,
            postImage,
            lat,
            lon
        }).save()

        let _id = post._id

        await userDb.update({ _id: user_id }, {
            $push: {
                postRealted: _id
            }
        })

        res.json({ message: "created Successfully", post: post })

    } catch (err) {
        res.json({ message: "error", err });

    }
}

exports.get = async(req, res, next) => {
    let { user_id } = req.body
    console.log(user_id)
    userDb.find({ _id: user_id }).populate('postRealted').then(result => {
        console.log(result)
        res.json({ message: "success", posts: result })
    }).catch(err => {
        res.json({ message: "error", err })
    })
}