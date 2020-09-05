// Development keys

const DB_USER = 'rescure_app';
const PASSWORD = encodeURIComponent('rescure'); 
const DB_NAME ='Rescure';
const DB_URL = `mongodb+srv://${DB_USER}:${PASSWORD}@cluster0.lnuga.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

module.exports = {
    mongoURI: DB_URL
};