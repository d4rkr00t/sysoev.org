var docpadConfig = {

    collections: {
        posts: function() {
            return this.getCollection('html').findAllLive({
                relativeOutDirPath: 'posts',
                isPagedAuto: {
                    $ne: true
                }
            });
        }
    },

    plugins: {
        tags: {
            injectDocumentHelper: function(doc) {
                return doc.setMeta({
                    layout: 'tag'
                });
            }
        }
    }

};

module.exports = docpadConfig;
