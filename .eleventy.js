const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function createEleventyConfig(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("discussTwitter", function (value) {
    return `https://mobile.twitter.com/search?q=${encodeURIComponent(
      `https://sysoev.org${value}`
    )}`;
  });

  eleventyConfig.addFilter("ogImage", function ([postUrl, imageUrl]) {
    return `https://sysoev.org${postUrl}${imageUrl}`;
  });

  return {
    templateFormats: ["html", "md", "css", "png", "svg"],
    htmlTemplateEngine: "njk",
  };
};
