const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
  console.log(`crawling ${currentURL}`);

  try {
    const response = await fetch(currentURL);

    if (response.status > 399) {
      console.log(
        `error fetching ${currentURL}. Status code: ${response.status}`
      );
      return;
    }

    const contentType = response.headers.get("content-type");

    if (!contentType.includes("text/html")) {
      console.log(
        `skipping ${currentURL} because it is not HTML. Content type: ${contentType}`
      );
      return;
    }

    const text = await response.text();
    console.log(text);
  } catch (error) {
    console.log(`error fetching ${currentURL}: ${error.message}`);
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);

  const linkElements = Array.from(dom.window.document.querySelectorAll("a"));

  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      // relative url
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error with relative url: ${error.message} `);
      }
    } else {
      // absolute url
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error with absolute url: ${error.message} `);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObject = new URL(urlString);

  const hostPath = `${urlObject.hostname}${urlObject.pathname}`;

  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }

  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
