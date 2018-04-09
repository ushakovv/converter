var app = require('express')();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mjml = require('mjml');
var mjmlConverter = require('mjml2json');
var converter = require('./converter@4.0.0');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.get('/', function(req, res, next) {
    res.send({status: 'enable'});
});
app.post('/', function(req, res, next) {
    var json2object = JSON.parse(req.body.payload);
    var payload = converter(json2object);
    var json2mjml = mjml(payload);
    res.send(json2mjml);
});
app.get('/convert', function(req, res, next) {
    var t= mjmlConverter.default(
        '<mjml>\n' +
        '<mj-head>\n' +
        '<mj-text padding="0" />' +
        '<mj-class name="blue" color="blue" />' +
        '<mj-class name="big" font-size="20px" />' +
        '<mj-all font-family="Arial" />' +
        '  <mj-style>\n' +
        '    @media all and (max-width: 480px) {\n' +
        '      div[style*="color:#F45e46;"] {\n' +
        '        text-align: center !important\n' +
        '      }\n' +
        '    }\n' +
        '  </mj-style>\n' +
        '  <mj-style inline="inline">' +
        '    .link-nostyle {' +
        '      color: inherit;' +
        '      text-decoration: none' +
        '    }' +
        '    h1 {' +
        '      color: inherit;' +
        '    }' +
        '  </mj-style>\n' +
        '</mj-head>\n' +
        '<mj-body>\n' +
        '  <mj-section >\n' +
        '    <mj-column>\n' +
        '      <mj-image width="100" src="/assets/img/logo-small.png"></mj-image>\n' +
        '\n' +
        '      <mj-divider border-color="#F45E43"></mj-divider>\n' +
        '\n' +
        '      <mj-text font-size="20px" color="#F45e46" font-family="helvetica">\n' +
        '        Hello <a href="https://mjml.io" class="link-nostyle">World</a>\n' +
        '      </mj-text>\n' +
        '\n' +
        '    </mj-column>\n' +
        '  </mj-section>\n' +
        '</mj-body>\n' +
        '</mjml>'
    );
    res.setHeader('content-type', 'application/json');
    res.send(t);
});
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
// its cool
