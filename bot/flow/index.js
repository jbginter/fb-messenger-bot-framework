const errors = require('./global/error'),
	  faq = require('./global/faq'),
	  help = require('./global/help'),
	  fs = require('fs'),
	  path = require('path'),
	  _ = require('lodash'),
	  flow = {},
	  sections = path.resolve(__dirname, 'sections');

const dirs      = fs.readdirSync(sections);
const pattern = new RegExp(/[\w-]*\.js(on)?/);

let filtered  = _.filter(dirs, fileName => pattern.test(fileName));

filtered.forEach(file => {
  const fileName = _.camelCase(file.replace(/\.js(on)?/, ''));
  Object.assign(flow, require(`./sections/${file}`));
});

const Flow = Object.assign({},
	flow,
	errors,
	faq,
	help)
;

module.exports = Flow;
