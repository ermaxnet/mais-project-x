const STATUSES = {
    [1]: "connected",
    [0]: "disconnected",
    [undefined]: "unknown"
};

const WELCOME_PAGE_STATE = {
    REGISTER: 100,
    LOGIN: 200
};

const API = "http://localhost:8002/";
const COOKIE = "bearer";

const MaisAPI = {
    ["AUTH.CREATE"]: `${API}auth/create`,
    ["AUTH.TOKEN-MAIS"]: `${API}auth/token/mais`,
    ["AUTH.TOKEN-PZK"]: `${API}auth/token/pzk`,
    ["USER"]: `${API}user`
};

module.exports = {
    STATUSES,
    WELCOME_PAGE_STATE,
    API,
    MaisAPI,
    COOKIE
};