var phantom = require('phantom');

exports.index = function(req, res) {
  var profiles = [
    'https://github.com/celso-wo',
    'https://github.com/Todev3',
    'https://github.com/felipebernardes',
    'https://github.com/GabrielJacquier',
    'https://github.com/mikemajesty',
    'https://github.com/samfrezza'
  ];

  res.render('pages/index', { profiles: profiles});
};

exports.profile = function(req, res) {
  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.open(req.query.url).then(function(status) {
        page.evaluate(function() {
          return {
            avatar: document.querySelector('img.avatar').outerHTML,
            calendar: document.querySelector('[data-graph-url]').outerHTML,
            vcard: document.querySelector('.vcard-names').outerHTML,
          };
        }).then(function(data) {
          page.close();
          ph.exit();

          data.url = req.query.url;

          res.render('pages/profile', data);
        });
      });
    });
  });
};
