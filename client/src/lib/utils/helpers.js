import { v4 as uuidv4 } from 'uuid';

export const toMachineFriendlyUsername = (name) => {
    let baseName = name
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters except spaces
        .trim() // Remove leading and trailing spaces
        .replace(/\s+/g, '_'); // Replace spaces with underscores

    // Adjust baseName to be exactly 10 characters
    if (baseName.length > 10) {
        baseName = baseName.substring(0, 10);
    } else while (baseName.length < 10) {
        baseName += getRandomLetter();
    }

    let smallUuid = uuidv4().split('-')[0]; // Get the first part of the UUID for brevity

    return `${baseName}_${smallUuid}`;
};

const getRandomLetter = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
};


export const serializeNonPOJOs = (obj) => {
	return JSON.parse(JSON.stringify(obj));
};


export const toastByUrl = (type, message) => {
    return `toast_type=${type}&toast_message=${encodeURIComponent(message)}`
}