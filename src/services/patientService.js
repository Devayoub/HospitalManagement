/**
 * Patient Service
 */

const _ = require('lodash')
const Joi = require('joi')
const helper = require('../common/helper')
const logger = require('../common/logger')
const errors = require('../common/errors')
const models = require('../models')

const Patient = models.Patient
const Rooms = models.Rooms


/**
 * add Patient 
 * @param {String} currentUser User Id
 * @param {Object} Patient  Patient Data
 * @returns {Object} Created User
 */
const addPatient = async (data)=>{

    return Patient.create(data)
}

addPatient.schema = {
    data: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        sex: Joi.string().required(),
        hospitalNumber: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        diseases: Joi.array().items(Joi.string())
      
    }).required()
  }


/**
* get One Patient 
* @param {String} PatientId the patient Id
* @returns {Object} patient
*/
const OnePatient = async (PatientId)=>{

return  await helper.ensureExists(Patient, { _id: PatientId })
        

}

OnePatient.schema = {
    PatientId: Joi.id() // defined in app-bootstrap
    }
  
/**
* get all Patients
* @param {Object} criteria criteria
* @returns {Array} List of patient
*/
const AllPatient = async (criteria)=>{
     // build filter object
     const filter = {  }
     if (criteria.keyword) {
       filter.$or = [{ question: new RegExp(criteria.keyword, 'i') }, { helpText: new RegExp(criteria.keyword, 'i') },
         { labelText: new RegExp(criteria.keyword, 'i') }]
     }
   
   
     // query total count
     const totalCount = await Patient.count(filter)
     // query records
     // for sorting, add second sorting by _id if sortColumn is not id, so that result order is determined
     if (criteria.sortColumn === 'id') {
       criteria.sortColumn = '_id'
     }
     let sortStr = `${criteria.sortOrder.toLowerCase() === 'asc' ? '' : '-'}${criteria.sortColumn}`
     if (criteria.sortColumn !== '_id') {
       sortStr += ' _id'
     }
     let p = Patient.find(filter).sort(sortStr).skip(criteria.skip)
     if (criteria.limit) {
       p = p.limit(criteria.limit)
     }
     const results = await p
     return { totalCount, results }
   

}

AllPatient.schema = {
    criteria: Joi.object().keys({
      keyword: Joi.string(),
      skip: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1),
      sortColumn: Joi.string().valid('id', 'title').default('createdOn'),
      sortOrder: Joi.sortOrder()
    })
  }


/**
* Update Patient
* @param {String} patientId request
* @param {Object} data New patient Data
* @returns {Array} updated patient
*/
const UpdatePatient = async (patientId,data)=>{

    const patient = await helper.ensureExists(Patient, { _id: patientId })
    if(data.diseases) {
      patient.diseases.push(data.diseases)
      delete data.diseases
    }
    _.assignIn(patient, data)
    return patient.save()

}

UpdatePatient.schema = {
    patientId: Joi.id(), // defined in app-bootstrap
    data: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        sex: Joi.string().required(),
        hospitalNumber: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        diseases: Joi.string()
      
    }).required()
    }

/**
* Delete Patient
* @param {String} patientId patient Id
*/
const DeletePatient = async (patientId)=>{

     await helper.ensureExists(Patient, { _id: patientId });
    await Patient.deleteOne({_id:patientId})

}

DeletePatient.schema = {
  patientId: Joi.id() // defined in app-bootstrap
  }

  /**
 * 
 * @param {String} hospitalNumber the hospitalNumber Id
 * @param {String} futureRoom the futureRoom Id 
 */
const patientToRoom = async (hospitalNumber,futureRoom)=>{
  const patient  = await helper.ensureExists(Patient, { _id: hospitalNumber })
  const room  = await helper.ensureExists(Rooms, { _id: futureRoom ,availability:true})

  room.availability = false
  patient.room = futureRoom
  room.save

  return patient.save
}

patientToRoom.schema = {

  hospitalNumber: Joi.id(), // defined in app-bootstrap
  futureRoom: Joi.id() 

}

module.exports = {
        addPatient,
        OnePatient,
        AllPatient,
        UpdatePatient,
        DeletePatient,
        patientToRoom
}

logger.buildService(module.exports)