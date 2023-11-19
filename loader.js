/* eslint-disable prefer-rest-params, no-var, no-plusplus */
(function (window, perfninja) {
  var addToQueue = function () {
    window[perfninja].q.push(
      arguments[0],
      Array.prototype.slice.call(arguments, 1),
    );
  };
  var methods = ['init', 'mark', 'measure'];

  window[perfninja] = { q: [] };

  for (var i = 0; i < 2; i++)
    window[perfninja][methods[i]] = addToQueue.bind({}, methods[i]);

  var script = window.document.createElement('script');
  script.src = process.env.LOADER_SCRIPT_URL;

  if (window.document.head) {
    window.document.head.appendChild(script);
  }
})(window, 'perfninja');
