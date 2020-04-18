/**
 * Patient Controller
 */


const patientservice = require('../services/patientService')
/**
 * add Patient 
 * @param {Object} req request
 * @param {Object} res response
 */
 const addPatient = async (req,res)=>{

    res.send(await patientservice.addPatient(req.body))

 }


 /**
 * get One Patient 
 * @param {Object} req request
 * @param {Object} res response
 */
const OnePatient = async (req,res)=>{

 res.send(await patientservice.OnePatient(req.params.id))

}

 /**
 * get all Patients
 * @param {Object} req request
 * @param {Object} res response
 */
const AllPatient = async (req,res)=>{

    res.send(await patientservice.AllPatient(req.query))


}


 /**
 * Update Patient
 * @param {Object} req request
 * @param {Object} res response
 */
const UpdatePatient = async (req,res)=>{

    res.send(await patientservice.UpdatePatient(req.params.id,req.body))

}

/**
 * Delete Patient
 * @param {Object} req request
 * @param {Object} res response
 */
const DeletePatient = async (req,res)=>{

    res.send(await patientservice.DeletePatient(req.params.id))

}



module.exports = {
    addPatient,
    OnePatient,
    AllPatient,
    UpdatePatient,
    DeletePatient 
}