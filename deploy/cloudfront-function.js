// Optional: associate with viewer-request when CloudFront uses an S3 REST origin.
// S3 website endpoints resolve directory indexes without this function.
function handler(event) {
  var request = event.request;
  var pages = {
    '/': '/index.html',
    '/about': '/about/index.html',
    '/about/': '/about/index.html',
    '/locations': '/locations/index.html',
    '/locations/': '/locations/index.html',
    '/jobs': '/jobs/index.html',
    '/jobs/': '/jobs/index.html',
  };
  if (Object.prototype.hasOwnProperty.call(pages, request.uri)) {
    request.uri = pages[request.uri];
  }
  return request;
}
