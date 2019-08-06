const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

export const setValue = (data) => {
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(USER_KEY, data.user)
}

export const getUser = () => {
   return localStorage.getItem(USER_KEY);
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
	window.location.reload()
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}