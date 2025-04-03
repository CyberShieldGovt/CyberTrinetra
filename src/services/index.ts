import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

//modified the base url
//const BASE_URL = "https://cybershield-backend.onrender.com/api/v1/"
const BASE_URL = "https://13.232.236.75:5000/api/v1/"

export const loginUser = async ({ email, password }: { email: string; password: string }): Promise<{
    user: any;
    success: any;
} | undefined> => {
    try {
        const url = BASE_URL + 'auth/login';
        const response: AxiosResponse<{
            user: any;
            success: any;
        }> = await axios.post(url, { email, password });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const { data, status }: { data: { message: string }; status: number } = error.response;
            toast.error(data.message || 'Login failed');
        } else if (error.request) {
            toast.error('No response from server. Please try again.');
        } else {
            toast.error('Login request failed. Please try again.');
        }
        return undefined;
    }
};

export const registerUser = async ({ name, email, mobile, password }: { name: string; email: string; mobile: string; password: string }): Promise<{
    user: any;
    success: any;
} | undefined> => {
    try {
        const url = BASE_URL + 'auth/register';
        const response: AxiosResponse<{
            user: any;
            success: any;
        }> = await axios.post(url, { name, email, phone: mobile, password });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const { data, status }: { data: { message: string }; status: number } = error.response;
            toast.error(data.message || 'Login failed');
        } else if (error.request) {
            toast.error('No response from server. Please try again.');
        } else {
            toast.error('Login request failed. Please try again.');
        }
        return undefined;
    }
};

export const uploadComplain = async (complainData: { complain: string | Blob; extraDoc: string | Blob; category: string | Blob; approxDate: string | Blob; description: string | Blob; }) => {
    try {
        const url = BASE_URL + 'complain/upload';
        const formData = new FormData();
        formData.append('complain', complainData.complain);
        formData.append('extraDoc', complainData.extraDoc);
        formData.append('category', complainData.category);
        formData.append('approxDate', complainData.approxDate);
        formData.append('description', complainData.description);
        
        const response: AxiosResponse<{
            complain: any;
            success: any;
        }> = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading complain:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getComplainById = async ({ complainId }: { complainId: string }) => {
    try {
        const url = BASE_URL + `complain/getById/${complainId}`;        
        const response: AxiosResponse<{
            complain: any;
            success: any;
        }> = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading complain:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getUserById = async () => {
    try {
        const url = BASE_URL + `auth/`;        
        const response: AxiosResponse<{
            user: any;
            success: any;
        }> = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error getting user:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateUserById = async ({name, email, phone}: {name: string; email: string; phone: string}) => {
    try {
        const url = BASE_URL + `auth/update`;        
        const response: AxiosResponse<{
            user: any;
            success: any;
        }> = await axios.post(url,{name, email, phone}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error getting user:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getAdminComplains = async ({complainId, status, category}:{complainId: string, status: string, category: string}) => {
    try {
        const url = BASE_URL + `admin/?complainId=${complainId}&status=${status}&category=${category}`;        
        const response: AxiosResponse<{
            admin: any;
            success: any;
        }> = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error getting user:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateAdminComplains = async ({complainId, status, comment}:{complainId: string, status: string, comment: string}) => {
    try {
        const url = BASE_URL + `admin/update`;        
        const response: AxiosResponse<{
            admin: any;
            success: any;
        }> = await axios.post(url,{complainId, comment, status}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error getting user:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getAdminAnalytics = async () => {
    try {
        const url = BASE_URL + `admin/analytics`;        
        const response: AxiosResponse<{
            admin: any;
            success: any;
        }> = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error getting user:', error.response ? error.response.data : error.message);
        throw error;
    }
};
