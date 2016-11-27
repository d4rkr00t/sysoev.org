const fs = require('fs');
const glob = require('glob');
const UglifyJS = require('uglify-js');
const ROOT = './docs';
const SW_TEMPLATE = './service-worker/service-worker.js';
const SW_OUTPUT = './docs/service-worker.js';
const SW_INLINE_SCRIPT = './service-worker/service-worker-inline-script.js';
const SW_INLINE_SCRIPT_PLACEHOLDER = /<script id=service-worker><\/script>/;
const PAGE = './docs/index.html';
const VERSION = Date.now();
const MATCHERS = [
    /\.css$/,
    /\.js$/,
    /\.ico$/,
    /\.json$/,
    /\.svg/
];

function loadTemplate(filePath) {
    return new Promise(resolve => {
        fs.readFile(filePath, 'utf-8', (e, data) => {
            resolve(data);
        });
    });
}

function minify(content) {
    return UglifyJS.minify(content, { fromString: true }).code;
}

glob('**/*.*', { cwd: ROOT }, (e, files) => {
    const cacheList = files
        .filter(file => MATCHERS.some(m => file.match(m)))
        .map(file => '/' + file);

    cacheList.push('/');

    Promise
        .all([SW_TEMPLATE, SW_INLINE_SCRIPT, PAGE].map(loadTemplate))
        .then(([template, inlineScript, page]) => {
            template = template
                .replace(/{{VERSION}}/, VERSION)
                .replace(/{{URLS_TO_CACHE}}/, cacheList.map(c => `'${c}'`).join(','));

            page = page
                .replace(SW_INLINE_SCRIPT_PLACEHOLDER, `<script>${minify(inlineScript)}</script>`);

            fs.writeFile(SW_OUTPUT, minify(template));
            fs.writeFile(PAGE, page);
        });
});
