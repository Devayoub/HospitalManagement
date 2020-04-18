/**
 * Rooms Controller
 */
const roomService = require('../services/roomService')


/**
 * 
 * @param {req} req the request 
 * @param {res} res the responese
 */
const addRoom = async (req,res)=>{

  res.send(await roomService.addRoom(req.body))

}

/**
 * 
 * @param {req} req the request 
 * @param {res} res the responese
 */
const allRooms = async (req,res)=>{

    res.send(await roomService.allRooms(req.query))

}
/**
 * 
 * @param {req} req the request 
 * @param {res} res the responese
 */
const patientToRoom = async (req,res)=>{

    res.send(await roomService.patientToRoom(req.params.hospitalNumber,req.params.futureRoom))

}
/**
 * 
 * @param {req} req the request 
 * @param {res} res the responese
 */
const swappatients = async (req,res)=>{

    res.send(await roomService.swappatients(req.params.patientWithRoomId,req.params.patientWithoutRoomId))

}
/**
 * 
 * @param {req} req the request 
 * @param {res} res the responese
 */
const deleteRoom= async (req,res)=>{

    res.send(await roomService.deleteRoom(req.params.id))

}

module.exports = {
    addRoom,
    allRooms,
    patientToRoom,
    swappatients,
    deleteRoom
}
