const bcrypt = require('bcryptjs')
 const jwt = require('jsonwebtoken')




 function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
   const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64')
   const token = jwt.sign({ user_id: user.id }, secret, {
     subject: user.user_name,
     algorithm: 'HS256',
   })
   return `Bearer ${token}`
 }
 