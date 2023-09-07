//this allows the user variable to be accesed on all routes. 
//Probably not neccesary, but shows how to inject variables into all pages
export const load = async (event) => {
    return {
        user: event.locals.userData
    };
}; 