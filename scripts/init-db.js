/**
 * Initialize database collections. Clear existing collections and insert test data
 */

require('../app-bootstrap')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const models = require('../src/models')
const logger = require('../src/common/logger')
const helper = require('../src/common/helper')
const User   = models.User
const Patient =  models.Patient
const Diseases  =  models.Diseases
const Rooms  = models.Rooms


/*
 * Delete records from all collections
 */
const clearDB = async () => {
  await User.deleteMany({})
  await Patient.deleteMany({})
  await Diseases.deleteMany({})
  await Rooms.deleteMany({})

}

/*
 * Insert test data
 */
const initDB = async () => {
 const user =  {
      name:'test daya',
      email:'test@email.com',
      password:'123456',
      company:'rjkr',
      phone:'99999999',
      avatarUrl:'http://www.zfrz.eada/'

  }
    // hash password
    user.passwordHash = await helper.hashString(user.password)
    delete user.password
    await  User.create(user)
  

    //init db
}

clearDB().then(() => {
  logger.info('Database tables cleared!')
  initDB().then(() => {
    logger.info('Test data loaded into Database')
    process.exit()
  })
}).catch((e) => {
  logger.logFullError(e)
  process.exit(1)
})