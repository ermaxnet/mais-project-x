const { 
    UserSchema,
    SettingsSchema,
    MaisTokenSchema,
    PzkTokenSchema
} = require("../database");
const               User = require("../../models/user"),
                      Op = require("sequelize").Op,
                  bcrypt = require("bcrypt-nodejs"),
        SALT_WORK_FACTOR = require("../settings.json").encrypt.salt_work_factor;

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

const create = (user) => {
    checkType(user);
    const build = UserSchema.build({
        username: user.nick,
        hash: user.hash,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        status_pzk: user.statusPzkCode,
        status_mais: user.statusMaisCode
    });
    return build.save()
        .then(userDTO => {
            return Promise.all([
                SettingsSchema.create({
                    imagesDir: user.settings.imagesDir,
                    avatar: user.settings.avatar,
                    category: user.settings.category,
                    displayName: user.settings.displayName,
                    id: userDTO.id
                }),
                MaisTokenSchema.create({
                    token: user.maisToken.value,
                    id: userDTO.id
                }),
                PzkTokenSchema.create({
                    token: user.pzkToken.value,
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
    
module.exports = {
    User,
    UserAPI: {
        create,
        validatePassword,
        find: {
            byId,
            where,
            byToken
        }
    }
};