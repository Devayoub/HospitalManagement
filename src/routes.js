/**
 * ScrapProductRoute
 */


module.exports = {

 '/diseases':{
    get : {method:'getDiseases',controller:'diseasesController',auth : true},
    post : {method:'addDisease',controller:'diseasesController',auth : true}
},
'/diseases/:id':{

    delete : {method:'deleteDisease',controller:'diseasesController',auth : true}
    
},

'/patient':{
  get : {method:'AllPatient',controller:'patientController',auth : true},
  post : {method:'addPatient',controller:'patientController',auth : true}
},
'/patient/:id':{

  get : {method:'OnePatient',controller:'patientController',auth : true},
  put : {method:'UpdatePatient',controller:'patientController',auth : true},
  delete : {method:'DeletePatient',controller:'patientController',auth : true}

},

'/room':{
  get : {method:'allRooms',controller:'roomController',auth : true},
  post : {method:'addRoom',controller:'roomController',auth : true}
},
'/room/:id':{

  put : {method:'patientToRoom',controller:'roomController',auth : true},
  delete : {method:'deleteRoom',controller:'roomController',auth : true}

},

'/login': {
    post: { controller: 'SecurityController', method: 'login',auth : false }
  },
  '/forgotPassword': {
    get: { controller: 'SecurityController', method: 'forgotPassword', auth : false}
  },
  '/changeForgotPassword': {
    get: { controller: 'SecurityController', method: 'changeForgotPassword', auth : false}
  },
  '/resetPassword': {
    post: { controller: 'SecurityController', method: 'resetPassword',auth : false  }
  },

  '/users': {
    get: {
      controller: 'UserController',
      method: 'searchUsers',
      auth : true
    },
    post: {
      controller: 'UserController',
      method: 'createUser',
      auth : false
    }
  },
  '/users/:userId': {
    get: { controller: 'UserController', method: 'getUser' , auth : true},
    put: {
      controller: 'UserController',
      method: 'updateUser',
      auth : true
    }
  },


}