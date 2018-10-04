const getFlowType = (elem) => {

	let type = null;
	if (elem.message) {
		type = 'text';
	} else if (elem.src) {
		type = 'attachment';
	} else if (elem.elements || elem.buttons) {
		type = `${elem.type}Template`;
	} else if (elem.quick_replies) {
		type = 'quickReply';
	}

	return type;
};

module.exports = getFlowType;
