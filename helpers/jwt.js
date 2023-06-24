const jwt = require('jsonwebtoken')

const keySecret = process.env.JWT_SECRET
const generateToken = (payload)=>jwt.sign(payload,keySecret)

const verifyToken = (token)=> jwt.verify(token, keySecret)

module.exports = {generateToken, verifyToken}