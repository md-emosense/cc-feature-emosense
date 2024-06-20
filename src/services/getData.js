const { Firestore } = require('@google-cloud/firestore');
 
// https://chartbrew.com/blog/how-to-fetch-and-filter-firestore-collection-data-with-firebase-nodejs-sdk/

// async function getData() {
//     console.log("masuk sini kok");
//     const db = new Firestore();

//     const audioCol = db.collection('speech-audio');
//     const snapshot = await audioCol.get();
//     snapshot.forEach(doc => {
//         console.log(doc.id, '=>', doc.data());
//     });

//     return 'tets';
// }

async function getData() {
    const db = new Firestore();
    const audioDocument = db.collection('speech-audio');

    try {
        const snapshot = await audioDocument.get();
        const result = [];

        snapshot.forEach(doc => {
            const data = doc.data();
            result.push({ id: doc.id, url_audio: data['url-audio'], word: data.word });
        });

        return result;
    } catch (error) {
        throw new ClientError('Terjadi kesalahan dalam melakukan pengambilan data')
    }
}

// async function getData() {
//     const db = new Firestore();
//     const audioCollection = db.collection('speech-audio');

//     try {
//         const snapshot = await audioCollection.get();
//         const result = [];

//         if (snapshot.empty) {
//             console.log('No matching documents.');
//             return result;
//         }

//         snapshot.forEach(doc => {
//             const data = doc.data(); // Get document data
//             console.log('Document data:', data); // Debugging: log document data
//             result.push({ id: doc.id, url_audio: data['url-audio'], word: data.word });
//         });

//         return result;
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         throw new Error('Terjadi kesalahan dalam melakukan pengambilan data');
//     }
// }
 
async function getSpeechById(id) {
    const db = new Firestore();
    const audioCollection = db.collection('speech-audio');

    try {
        const querySnapshot = await audioCollection.where('id', '==', id).get();
        const result = [];

        querySnapshot.forEach(doc => {
            const data = doc.data();
            result.push({ id: doc.id, url_audio: data['url-audio'], word: data.word });
        });

        return result;
    } catch (error) {
        throw new ClientError('Terjadi kesalahan dalam melakukan pengambilan data')
    }
}
 
module.exports = {
    getData,
    getSpeechById
};