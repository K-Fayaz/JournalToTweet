const { connection } = require("./queue");
const minutes = 60 * 10;

const storeVerificationCode = async (email, code) => {
    try {
        await connection.setex(`verify:${email}`, minutes, code);
    }
    catch(err){
        console.log("error: ",err);
    }
}

const validateVerificationCode = async (email, inputCode) => {
    const storedCode = await connection.get(`verify:${email}`);
    return storedCode === inputCode;
}

module.exports = { 
    storeVerificationCode, 
    validateVerificationCode 
};
