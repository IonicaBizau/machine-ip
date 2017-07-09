#!/usr/bin/env node
"use strict";

const Tilda = require("tilda")
    , machineIp = require("..")
    , logger = require("bug-killer")
    ;

new Tilda(`${__dirname}/../package.json`).main(action => {
    machineIp(err => {
        if (err) { return logger.log(err.stack, "error"); }
        logger.log(`Done at ${new Date()}`);
    });
});
