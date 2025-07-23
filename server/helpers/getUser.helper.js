const jwt = require("jsonwebtoken");
const { DateTime } = require('luxon');

const getUser = (headers) => {
    const token = headers.authorization?.split(" ")[1];
    if (!token) {
        throw new Error("No token provided");
    }
    const decoded = jwt.decode(token);
    return decoded;
};

/**
 * Filters out time slots that have already passed for the current day
 * @param {string[]} timeSlots - Array of time slots in HH:MM format
 * @returns {string[]} - Array of time slots that haven't passed yet
 */
const getAvailableTimeSlots = (timeSlots) => {
    const now = DateTime.now().setZone("Asia/Kolkata");
    return timeSlots.filter(slot => {
        const [hour, minute] = slot.split(':');
        const slotTime = DateTime.fromObject(
            { 
                year: now.year, 
                month: now.month, 
                day: now.day, 
                hour: parseInt(hour), 
                minute: parseInt(minute) 
            },
            { zone: "Asia/Kolkata" }
        );
        // Return true if the slot time is in the future
        return slotTime > now;
    });
};

/**
 * Gets locked (past) time slots for the current day
 * @param {string[]} timeSlots - Array of time slots in HH:MM format
 * @returns {string[]} - Array of time slots that have already passed
 */
const getLockedTimeSlots = (timeSlots) => {
    const now = DateTime.now().setZone("Asia/Kolkata");
    return timeSlots.filter(slot => {
        const [hour, minute] = slot.split(':');
        const slotTime = DateTime.fromObject(
            { 
                year: now.year, 
                month: now.month, 
                day: now.day, 
                hour: parseInt(hour), 
                minute: parseInt(minute) 
            },
            { zone: "Asia/Kolkata" }
        );
        // Return true if the slot time has passed
        return slotTime <= now;
    });
};

module.exports = {
    getUser,
    getAvailableTimeSlots,
    getLockedTimeSlots
};