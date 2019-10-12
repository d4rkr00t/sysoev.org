module.exports = function createEleventyConfig(eleventyConfig) {
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("discussTwitter", function(value) {
    return `https://mobile.twitter.com/search?q=${encodeURIComponent(
      `https://sysoev.org${value}`
    )}`;
  });

  return {
    templateFormats: ["html", "md", "css", "png", "svg"],
    htmlTemplateEngine: "njk"
  };
};
