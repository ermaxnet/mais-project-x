const {
    ContactAPI
} = require("../models/contact");

module.exports = router => {

    router.get("/:uId", (req, res, next) => {
        const userId = req.params.uId;
        ContactAPI.getContacts(userId)
            .then(contacts => {
                res.json({ success: true, contacts });
            })
            .catch(err => next(err));
    });

    return router;

};