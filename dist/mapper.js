"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class SiteNode {
    constructor(url, parent = null) { this.url = url; }
}
const awaitingPromises = new Array();
const visitedSites = new Map();
const urlStack = new Array();
urlStack.push(new SiteNode(process.argv[2]));
async function visit(site) {
    awaitingPromises.push(axios_1.default
        .get(site.url)
        .then(res => {
        const regex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
        const links = res.data.match(regex);
        for (const link of links) {
            const url = new URL(link);
            console.log(url);
        }
        console.log(links);
    }));
}
async function visitSite(baseUrl) {
    while (urlStack.length !== 0) {
        await visit(urlStack.pop());
    }
    Promise.allSettled(awaitingPromises).then((settledPromises) => {
        console.log(settledPromises);
    });
}
//# sourceMappingURL=mapper.js.map