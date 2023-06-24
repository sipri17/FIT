const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models')


const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw ({ name: "invalid token" })
        }
        const payload = verifyToken(access_token)
        const user = await User.findByPk(payload.id)

        if (!user) {
            throw { name: "invalid token" }
        }

        const {id,npp_supervisor,npp } = user

        req.user = {
            id ,
            npp_supervisor,
            npp
        }

        next()
    } catch (err) {
        next(err)
    }

}


module.exports = authentication