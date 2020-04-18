/**
 * Disease Service
 */

const _ = require('lodash')
const Joi = require('joi')
const helper = require('../common/helper')
const logger = require('../common/logger')
const errors = require('../common/errors')
const models = require('../models')

const Disease = models.Diseases



/**
 * 
 * @param {String} currentUser User Id
 * @param {Object} data  Disease Data
 * @returns {Object} Created User
 */
const addDisease = async (data)=>{
    return Disease.create(data)
}

addDisease.schema = {
    data: Joi.object().keys({
        name: Joi.string().required(),
        score: Joi.number().integer().required(),
    }).required()
  }

/**
* get all Patients
* @param {Object} criteria criteria
* @returns {Array} List of Diseases
 */
const getDiseases = async (criteria)=>{
        // build filter object
        const filter = {}
        if (criteria.keyword) { 
            filter.$or = [{ question: new RegExp(criteria.keyword, 'i') }, { helpText: new RegExp(criteria.keyword, 'i') },
              { labelText: new RegExp(criteria.keyword, 'i') }]
          }
        
        
          // query total count
          const totalCount = await Disease.count(filter)
          // query records
          // for sorting, add second sorting by _id if sortColumn is not id, so that result order is determined
          if (criteria.sortColumn === 'id') {
            criteria.sortColumn = '_id'
          }
          let sortStr = `${criteria.sortOrder.toLowerCase() === 'asc' ? '' : '-'}${criteria.sortColumn}`
          if (criteria.sortColumn !== '_id') {
            sortStr += ' _id'
          }
    let d = Disease.find(filter).sort(sortStr).skip(criteria.skip)
     if (criteria.limit) {
       d = d.limit(criteria.limit)
     }
     const results = await d
     return { totalCount, results }
   


}

getDiseases.schema = {
    criteria: Joi.object().keys({
      keyword: Joi.string(),
      skip: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1),
      sortColumn: Joi.string().valid('id', 'title').default('createdOn'),
      sortOrder: Joi.sortOrder()
    })
  }

/**
* Delete Disease
* @param {String} DiseaseId Disease Id
 */

const deleteDisease = async (DiseaseId)=>{

   await helper.ensureExists(Disease, { _id: DiseaseId })
    await Disease.deleteOne({DiseaseId})


}

deleteDisease.schema = {
    DiseaseId: Joi.id() // defined in app-bootstrap
  }


module.exports = {
    addDisease,
    getDiseases,
    deleteDisease
}

logger.buildService(module.exports)