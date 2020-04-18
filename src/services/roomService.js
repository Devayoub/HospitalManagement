/**
 * Rooms Service
 */

const _ = require('lodash')
const Joi = require('joi')
const helper = require('../common/helper')
const logger = require('../common/logger')
const errors = require('../common/errors')
const models = require('../models')

const Rooms = models.Rooms
const Patient = models.Patient
/**
 * add Room
 * @param {String} currentUser User Id
 * @param {Object} Room  Room Data
 * @returns {Object} Created Room
 */
const addRoom = async (data)=>{

    return Rooms.create(data)

}
addRoom.schema = {
    
    data: Joi.object().keys({
        name: Joi.string().required(),
        availability: Joi.boolean(),
    }).required()
  }

/**
* get all Rooms
* @param {Object} criteria criteria
* @returns {Array} List of Rooms
*/
const allRooms = async (criteria)=>{
    // build filter object
   const filter = {}
    if (criteria.keyword) {
        filter.$or = [{ question: new RegExp(criteria.keyword, 'i') }, { helpText: new RegExp(criteria.keyword, 'i') },
          { labelText: new RegExp(criteria.keyword, 'i') }]
      }
    
    
      // query total count
      const totalCount = await Rooms.count(filter)
      // query records
      // for sorting, add second sorting by _id if sortColumn is not id, so that result order is determined
      if (criteria.sortColumn === 'id') {
        criteria.sortColumn = '_id'
      }
      let sortStr 
      if (criteria.sortOrder ) {
         sortStr = `${criteria.sortOrder.toLowerCase() === 'asc' ? '' : '-'}${criteria.sortColumn}`
      }
      if (criteria.sortColumn !== '_id') {
        sortStr += ' _id'
      }
      let p = Rooms.find(filter).sort(sortStr).skip(criteria.skip)
      if (criteria.limit) {
        p = p.limit(criteria.limit)
      }
      const results = await p
      return { totalCount, results }

}
allRooms.schema = {
    criteria: Joi.object().keys({
      keyword: Joi.string(),
      skip: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1),
      sortColumn: Joi.string().valid('id', 'title').default('createdOn'),
      sortOrder: Joi.sortOrder()
    })
  }


/**
 *  swap patients method
 * @param {String} patientWithRoomId the patientWithRoom Id 
 * @param {String} patientWithoutRoomId the patientWithoutRoom Id
 */
const swappatients = async (patientWithRoomId,patientWithoutRoomId)=>{
    const patientWithRoom  = await helper.ensureExists(Patient, { _id: patientWithRoomId})
    const patientWithoutRoom  = await helper.ensureExists(Patient, { _id: patientWithoutRoomId})
    const room = patientWithRoom.room
    patientWithRoom.room = null
    patientWithoutRoom.room = room

    return {}
}

swappatients.schema = {

    patientWithRoom: Joi.id(), // defined in app-bootstrap
    patientWithoutRoom: Joi.id() 

}
/**
* Delete Room
* @param {String} RoomId Room Id
*/
const deleteRoom = async (RoomId)=>{
    await helper.ensureExists(Rooms, { _id: RoomId })
    await Rooms.deleteOne({RoomId})
}

deleteRoom.schema = {
    
    RoomId: Joi.id() // defined in app-bootstrap

  }


  module.exports = {
    addRoom,
    allRooms,
    swappatients,
    deleteRoom

  }