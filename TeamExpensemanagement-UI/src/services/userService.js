import axios from "axios";

const API_URL = "http://localhost:7799/api/users";

export const createUser = async (user) => {
    const response = await axios.post(
        `${API_URL}/createUser`,
        user
    );

    return response.data;
};

export const getAllUsers = async () => {
    const response = await axios.get(
        `${API_URL}/getUsers`
    );

    return response.data;
};

export const getUserById = async (id) => {
    const response = await axios.get(
        `${API_URL}/getUserbyId/${id}`
    );

    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(
        `${API_URL}/deleteUser/${id}`
    );

    return response.data;
};