// import axios from 'axios';
exports.creditCheck = async (creditForm) => {
    try {
        return true;
    } catch (error) {
        console.error('Error with credit check', error);
        throw error;
    }
}