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
    ["CONTACTS.REMOVE-CONTACT"]: "CONTACTS.REMOVE-CONTACT",
    ["CONTACTS.CHANGE-STATUS"]: "CONTACTS.CHANGE-STATUS",
    ["CONTACTS.UPDATE-CONTACT"]: "CONTACTS.UPDATE-CONTACT",
    ["CONTACTS.PUSH-CONTACT"]: "CONTACTS.PUSH-CONTACT",
    ["CONTACTS.CHANGE-USER-STATUS"]: "CONTACTS.CHANGE-USER-STATUS",
    ["MESSENGER.SELECT-CONTACT"]: "MESSENGER.SELECT-CONTACT",
    ["MESSENGER.SET-INTO-MESSAGES"]: "MESSENGER.SET-INTO-MESSAGES",
    ["MESSENGER.REMOVE-CONTACT"]: "MESSENGER.REMOVE-CONTACT",
    ["MESSENGER.ACCEPT-CONTACT"]: "CONTACTS.ACCEPT-CONTACT",
    ["MESSENGER.CLEAR"]: "MESSENGER.CLEAR",
    ["MESSENGER.SET-MESSAGES"]: "MESSENGER.SET-MESSAGES",
    ["MESSENGER.ADD-MESSAGE-TO-CONTACT"]: "MESSENGER.ADD-MESSAGE-TO-CONTACT",
    ["MESSENGER.CHANGE-MESSAGE-GROUP-MARK"]: "MESSENGER.CHANGE-MESSAGE-GROUP-MARK",
    ["CONTACTS-SEARCH.SET-LIST"]: "CONTACTS-SEARCH.SET-LIST",
    ["CONTACTS-SEARCH.CHANGE-KEY"]: "CONTACTS-SEARCH.CHANGE-KEY",
    ["CONTACTS-SEARCH.CLEAR"]: "CONTACTS-SEARCH.CLEAR"
};

const SOCKET_EVENTS = {
    ["CABINET.USER-CONNECTED"]: "CABINET.USER-CONNECTED",
    ["CABINET.USER-ONLINE"]: "CABINET.USER-ONLINE",
    ["CABINET.USER-OFFLINE"]: "CABINET.USER-OFFLINE",
    ["CONTACTS.CANCEL-REQUEST-ON-CONTACT"]: "CONTACTS.CANCEL-REQUEST-ON-CONTACT",
    ["CONTACTS.CANCEL-REQUEST-ON-CONTACT-DONE"]: "CONTACTS.CANCEL-REQUEST-ON-CONTACT-DONE",
    ["CONTACTS.ACCEPT-REQUEST-ON-CONTACT"]: "CONTACTS.ACCEPT-REQUEST-ON-CONTACT",
    ["CONTACTS.ACCEPT-REQUEST-ON-CONTACT-DONE"]: "CONTACTS.ACCEPT-REQUEST-ON-CONTACT-DONE",
    ["CONTACTS.REJECT-REQUEST-ON-CONTACT"]: "CONTACTS.REJECT-REQUEST-ON-CONTACT",
    ["CONTACTS.REJECT-REQUEST-ON-CONTACT-DONE"]: "CONTACTS.REJECT-REQUEST-ON-CONTACT-DONE",
    ["CONTACTS.SEND-REQUEST-ON-CONTACT"]: "CONTACTS.SENDS-REQUEST-ON-CONTACT",
    ["CONTACTS.SEND-REQUEST-ON-CONTACT-DONE"]: "CONTACTS.SEND-REQUEST-ON-CONTACT-DONE",
    ["CONTACTS.SEND-NEW-CONTACT"]: "CONTACTS.SEND-NEW-CONTACT",
    ["CONTACTS-SEARCH.START"]: "CONTACTS-SEARCH.START",
    ["CONTACTS-SEARCH.DONE"]: "CONTACTS-SEARCH.DONE",
    ["MESSENGER.GET-INTRO-MESSAGES"]: "MESSENGER.GET-INTRO-MESSAGES",
    ["MESSENGER.SET-INTRO-MESSAGES"]: "MESSENGER.SET-INTRO-MESSAGES",
    ["MESSENGER.GET-MESSAGES"]: "MESSENGER.GET-MESSAGES",
    ["MESSENGER.SET-MESSAGES"]: "MESSENGER.SET-MESSAGES",
    ["MESSENGER.SEND-MESSAGE"]: "MESSENGER.SEND-MESSAGE",
    ["MESSENGER.NEW-MESSAGE-FOR-CONTACT"]: "MESSENGER.ADD-MESSAGE-TO-CONTACT"
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
    [0]: "FINDED",
    [1]: "CREATED",
    [10]: "ESTABLISHED",
    [-10]: "BLOCKED"
};

const CONTACT_STATUSES_COD = {
    ["FINDED"]: 0,
    ["CREATED"]: 1,
    ["ESTABLISHED"]: 10,
    ["BLOCKED"]: -10
};

const MESSAGE_TYPE = {
    ["REGULAR"]: 6000,
    ["INTRO"]: 6002,
    ["SYSTEM"]: 1
};

const MESSENGER_DO_TYPES = {
    ["NONE"]: 0,
    ["SEND-CONTAT-REQUEST"]: 10
};

const BROWSER_CUSTOM_EVENTS = {
    ["MOVE-MESSAGES-SCROLL-TO-BOTTOM"]: "MOVE-MESSAGES-SCROLL-TO-BOTTOM"
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
    MESSAGE_TYPE,
    MESSENGER_DO_TYPES,
    BROWSER_CUSTOM_EVENTS
};