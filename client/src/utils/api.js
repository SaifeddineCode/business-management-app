
const getToken =() =>{
    return localStorage.getItem("token")
}

export const fetchWithToken = async  (url,options={}) =>{

    const token = getToken()

     // Add Authorization header to the request
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    
    // Add token if it exists
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Make the request
    const response = await fetch(url, {
        ...options,
        headers,
    });

    // Check if token is invalid or expired
    if (response.status === 401) {
        // Token is invalid/expired, logout user
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
    }

    return response

}

