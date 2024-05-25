import axios from 'axios'

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        // Add custom headers
        config.headers['Content-Type'] = 'application/json';
        config.headers['ngrok-skip-browser-warning'] = 'true';

        return config;
    },
    error => {
        // Handle the error
        return Promise.reject(error);
    }
);

const domain = "http://localhost:5001/api"

const getAllCategoriesAPI = async () => {
    let url = `${domain}/categories`;
    return await axios.get(url)
};
export {
    getAllCategoriesAPI,
}