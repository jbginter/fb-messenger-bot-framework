const text = require('./types/text');
const quickReply = require('./types/quickReply');
const attachment = require('./types/attachment');
const genericTemplate = require('./types/templates/genericTemplate');
const buttonTemplate = require('./types/templates/buttonTemplate');
const listTemplate = require('./types/templates/listTemplate');
const mediaTemplate = require('./types/templates/mediaTemplate');

module.exports = {
	text,
	genericTemplate,
	buttonTemplate,
	quickReply,
	attachment,
	listTemplate,
	mediaTemplate
};
