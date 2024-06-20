const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const { storeData } = require('../services/storeData');
const { saveUser, getAllClinic, login, getProfile, saveForum, getForumbyId, getAllForum, saveReply, getReplyByForumId, updateProfile } = require('../services/sqlService');
const { getData, getSpeechById } = require('../services/getData');

async function postPredictHandler(request, h) {
    const { userId, image } = request.payload;
    const { model } = request.server.app;

    const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);
    const predictionId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        "predictionId": predictionId,
        "userId": userId,
        "confidenceScore": confidenceScore,
        "label": label,
        "explanation": explanation,
        "suggestion": suggestion,
        "createdAt": createdAt
    }

    await storeData(predictionId, data);

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully.',
        data
    })
    response.code(201);
    return response;
}

async function postForumHandler(request, h) {
    const payload = request.payload;
  
    // Extract payload
    const userId = parseInt(payload.userId, 10);
    const judul = payload.judul;
    const isi = payload.isi;

    const data = {
        "userId": userId,
        "judul": judul,
        "isi" : isi,
    }

    // TO DO: Store data
    if (!userId || !judul || !isi) {
        return h.response({
            status: 'fail',
            message: 'Missing required field'
        }).code(400); // Bad request
    }

    try {
        await saveForum(data);
        const response = h.response({
            status: 'success',
            message: 'Forum has been successfully created.',
            data
        });
        response.code(201);
        return response;
    } catch (err) {
        const response = h.response({
            status: 'fail',
            message: err.message
        });
        response.code(400);
        return response;
    }
}

async function getAllForumHandler(request, h) {
    // TO DO: Make service for getAllForum()
    const data = await getAllForum();
  
    const response = h.response({
      status: 'success',
      data
    });
    response.code(200);
    return response;
}

async function getForumByIdHandler(request, h) {
    const { id } = request.params;
    try {
        const forum = await getForumbyId(id);
        const replies = await getReplyByForumId(id);
    
        const response = h.response({
            status: 'success',
            data: {
                forum: forum,
                replies: replies,
            },
        });
        response.code(200);
        return response;
    } catch (err) {
        const response = h.response({
            status: 'fail',
            message: 'Forum not found.'
        });
        response.code(400);
        return response;
    }
}

async function getAllClinicHandler(request, h) {
    const data = await getAllClinic();
  
    const response = h.response({
        status: 'success',
        data
    });
    
    response.code(200);
    return response;
}

async function postSignupHandler(request, h) {
    const payload = request.payload;
  
    // Extract payload
    const fullName = payload.fullName;
    const email = payload.email;
    const password = payload.password;
    const childName = payload.childName;
    const childBirthday = new Date(payload.childBirthday);
    const adhdDesc = payload.adhdDesc;

    const data = {
        "fullName": fullName,
        "email": email,
        "password": password,
        "childName": childName,
        "childBirthday": childBirthday,
        "adhdDesc": adhdDesc
    }

    // await saveUser(data);
  
    // const response = h.response({
    //     status: 'success',
    //     message: 'User has been successfully created.',
    //     data
    // })

    // response.code(201);
    // return response;

    if (!fullName || !email || !password || !childName || !childBirthday) {
        return h.response({
            status: 'fail',
            message: 'Missing required field'
        }).code(400); // Bad request
    }

    try {
        const result = await saveUser(data);
        const response = h.response({
            status: 'success',
            message: 'User has been successfully created.',
            data
        });
        response.code(201);
        return response;
    } catch (err) {
        const response = h.response({
            status: 'fail',
            message: err.message
        });
        response.code(400);
        return response;
    }
}

async function postLoginHandler(request, h) {
    const payload = request.payload;
  
    // Extract payload
    const email = payload.email;
    const password = payload.password;

    const data = {
        "email": email,
        "password": password,
    }

    if (!payload.email || !payload.password) {
        return h.response({
            status: 'fail',
            message: 'Missing required field'
        }).code(400); // Bad request
    }

    try {
        const result = await login(data);
        const response = h.response({
            status: 'success',
            message: 'User has been login successfully.',
            result
        });
        response.code(200);
        return response;
    } catch (err) {
        const response = h.response({
            status: 'fail',
            message: err.message
        });
        response.code(401);
        return response;
    }
}

async function getProfileHandler(request, h) {
    const id = request.params.id;

    if (!id) {
        return h.response({
            status: 'fail',
            message: 'Missing required field'
        }).code(400); // Bad request
    }

    try {
        // Passwordnya masih ikutan
        const output = await getProfile(id);

        const day = output[0].childBirthday.getDate();
        const month = output[0].childBirthday.getMonth() + 1;
        const year = output[0].childBirthday.getFullYear();
        const formattedBirthdayDate = `${day}-${month}-${year}`;

        const data = {
            "fullName": output[0].name,
            "email": output[0].email,
            "childName": output[0].childName,
            "childBirthday": formattedBirthdayDate,
            "adhdDesc": output[0].adhdDesc
        }

        const response = h.response({
            status: 'success',
            data
        });
        response.code(200);
        return response;
    } catch (err) {
        const response = h.response({
            status: 'fail',
            message: err.message
        });
        response.code(404);
        return response;
    }
}

async function getAllSpeechHandler(request, h) {
    const data = await getData();

    const response = h.response({
      status: 'success',
      data
    });
    response.code(200);
    return response;
}

async function getSpeechByIdHandler(request, h) {
    const { id } = request.params;
    const data = await getSpeechById(id);

    const response = h.response({
        status: 'success',
        data
    });
    response.code(200);
    return response;
}

async function postReplyHandler(request, h) {
    const payload = request.payload;
  
    // Extract payload
    const userId = parseInt(payload.userId, 10);
    const forumId = parseInt(payload.forumId, 10);
    const isi = payload.isi;

    const data = {
        "userId": userId,
        "isi" : isi,
        "forumId" : forumId,
    }

    // TO DO: Store data
    if (!userId || !isi || !forumId) {
        return h.response({
            status: 'fail',
            message: 'Missing required field'
        }).code(400); // Bad request
    }

    try {
        await saveReply(data);
        const response = h.response({
            status: 'success',
            message: 'Reply has been successfully created.',
            data
        });
        response.code(201);
        return response;
    } catch (err) {
        const response = h.response({
            status: 'fail',
            message: err.message
        });
        response.code(400);
        return response;
    }
}

async function updateProfileHandler(request, h) {
    const payload = request.payload;
  
    // Extract payload
    // id, name, email, password, childName, childBirthday, adhdDesc
    const id = parseInt(payload.id, 10);
    const name = payload.name;
    const email = payload.email;
    const password = payload.password;
    const childName = payload.childName;
    const childBirthday = payload.childBirthday;
    const adhdDesc = payload.adhdDesc;

    const data = {
        "id": id,
        "name": name,
        "email" : email,
        "password" : password,
        "childName" : childName,
        "childBirthday" : childBirthday,
        "adhdDesc" : adhdDesc,
    }

    // TO DO: Store data
    if (!id || !name || !email || !password || !childName || !childBirthday || !adhdDesc) {
        return h.response({
            status: 'fail',
            message: 'Missing required field'
        }).code(400); // Bad request
    }

    try {
        await updateProfile(data);
        const response = h.response({
            status: 'success',
            message: 'Profile has been successfully updated.',
            data
        });
        response.code(201);
        return response;
    } catch (err) {
        const response = h.response({
            status: 'fail',
            message: err.message
        });
        response.code(400);
        return response;
    }
}

module.exports = {
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
};