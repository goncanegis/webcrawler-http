function printReport(pages) {
  console.log("================");
  console.log("Report");
  console.log("================");
  const sortedPages = sortPages(pages);

  for (const page of sortedPages) {
    const url = page[0];
    const hits = page[1];
    console.log(`Found ${hits} links to page: ${url}`);
  }

  console.log("================");
  console.log("End report");
  console.log("================");
}

function sortPages(pages) {
  const pagesArr = Object.entries(pages);

  const sorted = pagesArr.sort((a, b) => {
    return b[1] - a[1];
  });

  return sorted;
}

module.exports = {
  sortPages,
  printReport,
};
