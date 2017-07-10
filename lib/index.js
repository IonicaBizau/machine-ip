"use strict";

const Gry = require("gry")
    , ipinfo = require("ipinfo")
    , oneByOne = require("one-by-one")
    , wJson = require("w-json")
    , json2md = require("json2md")
    , isThere = require("is-there")
    , os = require("os")
    , writeFile = require("fs").writeFile
    ;

/**
 * machineIp
 * Fetches the ip and creates the following files:
 *
 *    - `README.md`: The human readable information.
 *    - `ip.json`: The machine readable information.
 *    - `ip.txt`: The public ip written in a file.
 *
 * If any of these is changed, the git repository is updated.
 *
 * @name machineIp
 * @function
 * @param {Function} cb The callback function.
 */
module.exports = cb => {
    const repoPath = process.cwd();
    if (!isThere(`${repoPath}/.git`)) {
        return cb(new Error("This is not a git repo. Please set it up."));
    }

    const repo = new Gry(repoPath)
        , env = {}
        ;

    oneByOne([
        ipinfo
      , (next, data) => {
            env.data = data;
            wJson(`${repoPath}/ip.json`, data, next)
        }
      , next => {
            const data = env.data;
            const MAPS_URL = "http://maps.google.com/?q=";
            writeFile("README.md", json2md([
                { h1: "Machine IP" },
                { p: `Machine stats of \`${os.userInfo().username}@${os.hostname()}\`` },
                { h2: `Public IP: \`${data.ip}\`` },
                {
                    table: {
                        headers: [ "Name", "Value" ],
                        rows: [
                            [ "Public IP", `\`${data.ip}\``],
                            [ "Hostname", `\`${data.hostname}\``],
                            [ "City", `[${data.city}](${MAPS_URL}${encodeURIComponent(data.city)})`],
                            [ "Region", `[${data.region}](${MAPS_URL}${encodeURIComponent(data.region)})`],
                            [ "Country", `[${data.country}](${MAPS_URL}${encodeURIComponent(data.country)})`],
                            [ "Coordinates", `[${data.loc}](${MAPS_URL}${encodeURIComponent(data.loc)})`],
                            [
                                "Map",
                                {
                                    img: {
                                        title: "Location",
                                        source: `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(data.loc)}&zoom=9&size=640x200&sensor=false`
                                    }
                                }
                            ]
                        ]
                    }
                }
            ]), next)
        }
      , next => { writeFile(`${repoPath}/ip.txt`, env.data.ip, next); }
      , next => { repo.add(next); }
      , next => { repo.commit(`Update ${new Date()}`, next) }
      , next => { repo.exec("push", ["--all"], next) }
    ], cb)
};
