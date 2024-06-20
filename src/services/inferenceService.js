const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()

        // const tensor = tf.browser.fromPixels(image);
 
        const classes = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise'];
 
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
 
        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        const label = classes[classResult];
 
        if (label === 'Angry') {
            explanation = "anak marah"
            suggestion = "Segera konsultasi dengan dokter terdekat"
        }

        if (label === 'Disgust') {
            explanation = "anak disgust"
            suggestion = "Segera konsultasi dengan dokter terdekat"
        }

        if (label === 'Fear') {
            explanation = "anak fear."
            suggestion = "Segera konsultasi dengan dokter terdekat"
        }

        if (label === 'Happy') {
            explanation = "anak happy"
            suggestion = "Segera konsultasi dengan dokter terdekat"
        }

        if (label === 'Neutral') {
            explanation = "anak neutral"
            suggestion = "Segera konsultasi dengan dokter terdekat"
        }

        if (label === 'Sad') {
            explanation = "anak sad."
            suggestion = "Segera konsultasi dengan dokter terdekat"
        }

        if (label === 'Surprise') {
            explanation = "anak surprise."
            suggestion = "Segera konsultasi dengan dokter terdekat"
        }
         
        return { confidenceScore, label, explanation, suggestion };
    } catch (error) {
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi.');
    }
}
 
module.exports = predictClassification;