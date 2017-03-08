var express = require('express'),
    router  = express.Router();

    router.use("/addTopic",require("./addTopic"));
    router.use("/getTopic",require("./getTopic"));
    router.use("/getTopicList",require("./getTopicList"));
    router.use("/removeTopic",require("./removeTopic"));
    router.use("/updateTopic",require("./updateTopic"));
    router.use("/addPinup",require("./addPinup"));
    router.use("/editPinup",require("./editPinup"));
    router.use("/removePinup",require("./removePinup"));
    router.use("/updatePinup",require("./updatePinup"));
    router.use("/getRecentPinupTopic",require("./getRecentPinupTopic"));
    router.use("/linkPinupToTopic",require("./linkPinupToTopic"));

module.exports = router;
