class Settings {
    constructor({ id, imagesDir, avatar, category, businessCategory, displayName, tabNumber }) {
        this.id = id;
        this.imagesDir = imagesDir;
        this.avatar = avatar;
        this.category = category;
        this.businessCategory = businessCategory;
        this.displayName = displayName;
        this.tabNumber = tabNumber;
    }
};
module.exports = Settings;