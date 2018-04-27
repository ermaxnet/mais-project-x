const { 
    UserSchema,
    SettingsSchema,
    MaisTokenSchema,
    PzkTokenSchema
} = require("../database");
const               User = require("../../models/user"),
                   Token = require("../../models/token"),
                      Op = require("sequelize").Op,
                  bcrypt = require("bcrypt-nodejs"),
        SALT_WORK_FACTOR = require("../settings.json").encrypt.salt_work_factor;
const {
    STATUSES_COD
} = require("../../constants");

const checkType = user => {
    if(user instanceof User) { return; }
    throw new TypeError("User");
};

const associations = [
    {
        model: SettingsSchema,
        as: "Settings"
    },
    {
        model: MaisTokenSchema,
        as: "MaisToken"
    },
    {
        model: PzkTokenSchema,
        as: "PzkToken"
    }
];

const encryptPassword = password => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) { reject(err); }
            bcrypt.hash(password, salt, null, (err, hash) => {
                if (err) { reject(err); }
                return resolve(hash);
            });
        });
    });
};

const validatePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, isMatch) => {
            if(err) return reject(err);
            return resolve(isMatch);
        });
    });
};

UserSchema.hook("beforeCreate", user => {
    if(user.hash) {
        return encryptPassword(user.hash)
            .then(hash => {
                user.hash = hash;
                return Promise.resolve(user);
            })
    }
});

const create = user => {
    checkType(user);
    const build = UserSchema.build({
        username: user.username,
        hash: user.hash,
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        email: user.email,
        status_pzk: user.status_pzk,
        status_mais: user.status_mais
    });
    return build.save()
        .then(userDTO => {
            return Promise.all([
                SettingsSchema.create({
                    imagesDir: user.settings.imagesDir,
                    avatar: user.settings.avatar,
                    category: user.settings.category,
                    businessCategory: user.settings.businessCategory,
                    displayName: user.settings.displayName,
                    tabNumber: user.settings.tabNumber,
                    id: userDTO.id
                }),
                MaisTokenSchema.create({
                    token: user.maisToken.token,
                    id: userDTO.id
                }),
                PzkTokenSchema.create({
                    token: user.pzkToken.token,
                    id: userDTO.id
                }),
                Promise.resolve(userDTO)
            ]);
        })
        .then(([ settingsDTO, maisTokenDTO, pzkTokenDTO, userDTO ]) => 
            new User({
                ...userDTO.dataValues,
                Settings: settingsDTO,
                MaisToken: maisTokenDTO,
                PzkToken: userDTO
            }));
};

const byId = id => 
    UserSchema.findOne({
        where: { id },
        include: associations
    })
    .then(userDTO => 
        userDTO ? new User(userDTO) : null);

const where = where => 
    UserSchema.findOne({
        where, include: associations
    })
    .then(userDTO => 
        userDTO ? new User(userDTO) : null);

const byToken = token => 
    UserSchema.findOne({
        include: [
            associations[0],
            associations[1],
            {
                model: PzkTokenSchema,
                as: "PzkToken",
                where: { token }
            }
        ]
    })
    .then(userDTO => 
        userDTO ? new User(userDTO) : null);

const update = (userId, user) => {
    return UserSchema.findById(userId)
        .then(userDTO => {
            return userDTO.update({ ...user })
                .then(userDTO => new User(userDTO));
        });
};

const updatePZKToken = (userId, token) => {
    return PzkTokenSchema.findById(userId)
        .then(pzkTokenDTO => {
            return pzkTokenDTO.update({ token })
                .then(pzkTokenDTO => new Token(pzkTokenDTO));
        });
};

const updateMAISToken = (userId, token) => {
    return MaisTokenSchema.findById(userId)
        .then(maisTokenDTO => {
            return maisTokenDTO.update({ token })
                .then(maisTokenDTO => new Token(maisTokenDTO));
        });
};

const connect = (userId, token = null) => {
    const tasks = [
        update(userId, { status: STATUSES_COD["connected"] })
    ];
    if(token) {
        tasks.push(
            updateMAISToken(userId, token)
        );
    }
    return Promise.all(tasks);
};

const disconnect = (userId, hasToken = false) => {
    const tasks = [
        update(userId, { status: STATUSES_COD["disconnected"] })
    ];
    if(hasToken) {
        tasks.push(
            updateMAISToken(userId, null)
        );
    }
    return Promise.all(tasks);
};
    
module.exports = {
    User,
    UserAPI: {
        create,
        validatePassword,
        find: {
            byId,
            where,
            byToken
        },
        update,
        updatePZKToken,
        updateMAISToken,
        connect,
        disconnect
    }
};