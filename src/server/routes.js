const { 
  postPredictHandler, 
  postForumHandler, 
  getAllForumHandler, 
  getAllClinicHandler, 
  postSignupHandler, 
  postLoginHandler, 
  getProfileHandler, 
  getAllSpeechHandler, 
  getSpeechByIdHandler,
  getForumByIdHandler,
  postReplyHandler,
  updateProfileHandler
 } = require('../server/handler');
 
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        /*Mengizinkan data berupa gambar*/
        allow: 'multipart/form-data',
        multipart: true
      }
    }
  },
  {
    path: '/forum/upload',
    method: 'POST',
    handler: postForumHandler,
    options: {
      payload: {
        allow: ['application/json'],
        output: 'data',
        parse: true
      }
    }
  },
  {
    path: '/forum',
    method: 'GET',
    handler: getAllForumHandler
  },
  {
    path: '/forum/{id}',
    method: 'GET',
    handler: getForumByIdHandler
  },
  {
    path: '/clinic',
    method: 'GET',
    handler: getAllClinicHandler
  },
  {
    path: '/signup',
    method: 'POST',
    handler: postSignupHandler,
    options: {
      payload: {
        allow: ['application/json'],
        output: 'data',
        parse: true
      }
    }
  },
  {
    path: '/login',
    method: 'POST',
    handler: postLoginHandler,
    options: {
      payload: {
        allow: ['application/json'],
        output: 'data',
        parse: true
      }
    }
  },
  {
    path: '/profile/{id}',
    method: 'GET',
    handler: getProfileHandler,
  },
  {
    path: '/speech',
    method: 'GET',
    handler: getAllSpeechHandler,
  },
  {
    path: '/speech/{id}',
    method: 'GET',
    handler: getSpeechByIdHandler,
  },
  {
    path: '/reply/upload',
    method: 'POST',
    handler: postReplyHandler,
  },
  {
    path: '/profile/update',
    method: 'PUT',
    handler: updateProfileHandler,
  },
]
 
module.exports = routes;