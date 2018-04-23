class Settings {
    constructor({ id, imagesDir, avatar, category, displayName }) {
        this.id = id;
        this.imagesDir = imagesDir;
        this.avatar = avatar;
        this.category = category;
        this.displayName = displayName;
    }
    get image() {
        return `${this.imagesDir}${this.avatar}`;
    }
};
module.exports = Settings;