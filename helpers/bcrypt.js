const bcrypt = require('bcryptjs')

const hashedPassword = (pw)=>{
    return bcrypt.hashSync(pw,10)
}

const comparePassword = (pw,hashedPw)=>{
    return bcrypt.compareSync(pw,hashedPw)
}

module.exports = {hashedPassword,comparePassword}