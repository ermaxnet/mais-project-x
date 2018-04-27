const STATUSES = {
    [1]: "connected",
    [0]: "disconnected",
    [-100]: "unknown"
};

const STATUSES_COD = {
    ["connected"]: 1,
    ["disconnected"]: 0,
    ["unknown"]: -100
};

const WELCOME_PAGE_STATE = {
    REGISTER: 100,
    LOGIN: 200
};

const API = "http://127.0.0.1:8002/";
const COOKIE = "bearer";

const MaisAPI = {
    ["AUTH.CREATE"]: `${API}auth/create`,
    ["AUTH.TOKEN-MAIS"]: `${API}auth/token/mais`,
    ["AUTH.TOKEN-PZK"]: `${API}auth/token/pzk`,
    ["USER"]: `${API}user`
};

const SOCKET = API + "mais";

const REDUX_ACTIONS = {
    ["CABINET.USER-ADD"]: "CABINET.USER-ADD",
    ["CABINET.USER-CONNECT"]: "CABINET.USER-CONNECT"

};

const SOCKET_EVENTS = {
    ["CABINET.USER-CONNECTED"]: "CABINET.USER-CONNECTED"
};

module.exports = {
    STATUSES,
    STATUSES_COD,
    WELCOME_PAGE_STATE,
    API,
    MaisAPI,
    COOKIE,
    SOCKET,
    REDUX_ACTIONS,
    SOCKET_EVENTS
};