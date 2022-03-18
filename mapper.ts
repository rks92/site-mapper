import axios from 'axios';

class SiteNode {
  constructor(url: string) { this.url = url; }

  title: string;
  url: string;
  children: [SiteNode];
  staticURLs: [string];
}

const urlStack = [];
urlStack.push(process.argv[2]);
visit(new SiteNode(process.argv[2]));

let awaitingPromises: [Promise<string>];
const visitedSites = new Map<string, SiteNode>();

async function visit(site: SiteNode) {
  // Make request
  // Add to promises list
  return axios
    .get(site.url)
    .then(res => {
      // Populate the site node values
      // Add values to the stack if they haven't been visited
      // Add node to visited sites
      const regex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g
      const links = res.data.match(regex);

      for (const link of links) {
        const url = new URL(link);
        console.log(url);
      }

      console.log(links);
      // console.log(res);
    });
}

Promise.allSettled(awaitingPromises).then((settledPromises) => {
  // Build graph in d3
  console.log(settledPromises)
});

