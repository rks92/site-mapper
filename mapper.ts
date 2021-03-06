import axios from 'axios';

class SiteNode {
  constructor(url: string, parent: SiteNode = null) { this.url = url; }

  title: string;
  url: string;
  children: [SiteNode];
  parent: SiteNode;
  staticURLs: [string];
}

const awaitingPromises = new Array<Promise<string | void>>();
const visitedSites = new Map<string, SiteNode>();

const urlStack = new Array<SiteNode>();
urlStack.push(new SiteNode(process.argv[2]));

async function visit(site: SiteNode) {
  // Make request
  // Add to promises list
  return await axios
      .get(site.url)
      .then(res => {
        // Populate the site node values
        // Add children
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

async function visitSite(baseUrl) {
  while(urlStack.length !== 0) {
    await visit(urlStack.pop());
  }
}

visitSite(process.argv[2]);




