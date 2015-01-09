var docpadConfig = {

    collections: {
        posts: function() {
            return this.getCollection('html').findAllLive({
                relativeOutDirPath: 'posts',
                isPagedAuto: {
                    $ne: true
                }
            }, { date: -1 });
        }
    },

    plugins: {
        tags: {
            injectDocumentHelper: function(document) {
                document.setMeta({
                    layout: 'tag'
                });
            }
        },
        moment: {
            formats: [
              { raw: 'date', format: 'Do MMMM YYYY', formatted: 'humanDate' }
            ]
        }
    },

    templateData: {
        getDocIndex: function(document) {
            var posts = this.getCollection('html').findAllLive({
                relativeOutDirPath: 'posts',
                isPagedAuto: {
                    $ne: true
                }
            }, { date: 1 }).toJSON();

            for (var i = 0; i < posts.length; i++) {
                if (posts[i].id === document.id) {
                    return i;
                }
            }
        },

        getNextPost: function() {
            var index = this.getDocIndex(this.document),
                posts = this.getCollection('html').findAllLive({
                    relativeOutDirPath: 'posts',
                    isPagedAuto: {
                        $ne: true
                    }
                }, { date: 1 }).toJSON();

            if (index < posts.length - 1) {
                return posts[index + 1];
            }
        },

        getPrevPost: function() {
            var index = this.getDocIndex(this.document);

            if (index >= 1) {
                return this.getCollection('html').findAllLive({
                    relativeOutDirPath: 'posts',
                    isPagedAuto: {
                        $ne: true
                    }
                }, { date: 1 }).toJSON()[index - 1];
            }
        }
    }

};

module.exports = docpadConfig;
