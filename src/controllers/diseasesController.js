/**
 * Disease Controller
 */

const diseaseservice = require('../services/diseasesService')


/**
 * 
 * @param {req} req the request 
 * @param {res} res the response
 */
const addDisease = async (req,res)=>{

    res.send(await diseaseservice.addDisease(req.body))

}

/**
 * @param {req} req the request 
 * @param {res} res the response
 */
const getDiseases = async (req,res)=>{

    res.send(await diseaseservice.getDiseases(req.query))


}

/**
 * @param {req} req the request 
 * @param {res} res the response
 */

const deleteDisease = async (req,res)=>{

    res.send(await diseaseservice.deleteDisease(req.params.id))


}



module.exports = {
    addDisease,
    getDiseases,
    deleteDisease
}