const roleCheck = (userRoles, allowedRoles) => {
    let shortArray, longArray;
    
    // Determine which array is shorter
    if (userRoles.length < allowedRoles.length) {
        shortArray = userRoles;
        longArray = allowedRoles;
    } else {
        shortArray = allowedRoles;
        longArray = userRoles;
    }
    
    const set = new Set(shortArray);
    return longArray.some(item => set.has(item));
}

export default roleCheck;
