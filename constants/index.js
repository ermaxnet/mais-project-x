const STATUSES = {
    [1]: "connected",
    [0]: "disconnected",
    [-100]: "unknown",
    [100]: "hidden"
};

const STATUSES_COD = {
    ["connected"]: 1,
    ["disconnected"]: 0,
    ["unknown"]: -100,
    ["hidden"]: 100
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
    ["CABINET.USER-CONNECT"]: "CABINET.USER-CONNECT",
    ["CABINET.CONTACTS-BOOK"]: "CABINET.CONTACTS-BOOK",
    ["CABINET.SEARCH-BOOK"]: "CABINET.SEARCH-BOOK",
    ["CONTACTS.SET-LIST"]: "CONTACTS.SET-LIST",
    ["MESSENGER.SELECT-CONTACT"]: "MESSENGER.SELECT-CONTACT",
    ["MESSENGER.SET-INTO-MESSAGES"]: "MESSENGER.SET-INTO-MESSAGES"
};

const SOCKET_EVENTS = {
    ["CABINET.USER-CONNECTED"]: "CABINET.USER-CONNECTED",
    ["MESSENGER.GET-INTRO-MESSAGES"]: "MESSENGER.GET-INTRO-MESSAGES",
    ["MESSENGER.SET-INTRO-MESSAGES"]: "MESSENGER.SET-INTRO-MESSAGES"
};

const CONTACT_TYPES = {
    [100]: "DIALOG",
    [101]: "PRIVATE-DIALOG",
    [200]: "GROUP",
    [201]: "PRIVATE-GROUP"
};

const CONTACT_TYPES_COD = {
    ["DIALOG"]: 100,
    ["PRIVATE-DIALOG"]: 101,
    ["GROUP"]: 200,
    ["PRIVATE-GROUP"]: 201
};

const CONTACT_STATUSES = {
    [1]: "CREATED",
    [10]: "ESTABLISHED",
    [-10]: "BLOCKED"
};

const CONTACT_STATUSES_COD = {
    ["CREATED"]: 1,
    ["ESTABLISHED"]: 10,
    ["BLOCKED"]: -10
};

const MESSAGE_TYPE = {
    ["REGULAR"]: 6000,
    ["INTRO"]: 6002
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
    SOCKET_EVENTS,
    CONTACT_TYPES,
    CONTACT_TYPES_COD,
    CONTACT_STATUSES,
    CONTACT_STATUSES_COD,
    MESSAGE_TYPE
};