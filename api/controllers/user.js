
module.exports = router => {

    router.get("/", (req, res) => {
        res.json({ success: true, user: req.user });
    });

    return router;
};