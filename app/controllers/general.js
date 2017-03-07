var express = require('express'),
    router  = express.Router();

    router.use("/addPinup",require("./addPinup"));
    router.use("/editPinup",require("./editPinup"));
    router.use("/removePinup",require("./removePinup"));
    router.use("/updatePinup",require("./updatePinup"));
    router.use("/getRecentPinup",require("./getRecentPinup"));
    router.use("/updatePinupTopic",require("./updatePinupTopic"));

module.exports = router;
