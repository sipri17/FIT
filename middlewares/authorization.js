const { Epresence, User } = require('../models')

const approvalAuthorization = async (req, res, next) => {
    try {
        const { id } = req.params
        const epresence = await Epresence.findByPk(id, { include: [User] })
        if (!epresence) {
            throw { name: '404data not found', message: 'Epresence is not found' }
        }
        console.log('req.user.npp =',req.user.npp);
        console.log('epresence.User.npp_supervisor =',epresence.User.npp_supervisor);

        if (req.user.npp != epresence.User.npp_supervisor  ) {
            throw { name: 'forbidden' }
        }

        next()

    } catch (error) {
        next(error)
    }
}






module.exports = { approvalAuthorization }