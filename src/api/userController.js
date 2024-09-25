import axiosInstance from '../utilities/axiosInstance'

export const userLogIn = async (data) => {
    try {
        const response = await axiosInstance.post('/users/login', {
                email: data.email,
                password: data.password,
            },
            {
                withCredentials: true, // Ensure credentials are included with this specific request
            })

        const userData = response.data        
        return userData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const userSignUp = async (data) => {
    try {
        const userData = await axiosInstance.post('/users/signup', {
            name: data.name,
            email: data.email,
            password: data.password,
        })
    
        return userData.data
    } catch (error) {
        throw error
    }
}

export const emailOtpVerification = async (data) => {
    try {
        const response = await axiosInstance.post('/users/email-verification', {
            email: data.email,
            code: data.otp,
        })
        return response.data
        
    } catch (error) {
        console.error(error);
        throw error
    }
}

