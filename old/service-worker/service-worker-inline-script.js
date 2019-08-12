if ('serviceWorker' in navigator && (typeof Cache !== 'undefined' && Cache.prototype.addAll)) {
    navigator.serviceWorker.register('service-worker.js');
}
