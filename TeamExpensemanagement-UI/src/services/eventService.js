import axios from "axios";

const API_URL = "http://localhost:7799/api/events";

export const getAllEvents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createEvent = async (event) => {
    const response = await axios.post(API_URL, event);
    return response.data;
};

export const getEventById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const addMember = async (eventId, userId) => {
    const response = await axios.post(
        `${API_URL}/${eventId}/members/${userId}`
    );

    return response.data;
};

export const removeMember = async (eventId, userId) => {
    const response = await axios.delete(
        `${API_URL}/${eventId}/members/${userId}`
    );

    return response.data;
};