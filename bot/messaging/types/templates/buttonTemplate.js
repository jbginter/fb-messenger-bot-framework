const buttonTemplate = (obj) => {
	let buttons = [],
		type,
		method,
		message = obj.text;

	if (typeof message === 'object') {
		message = obj.text[Math.floor(Math.random() * obj.text.length)];
	}

	for (let i = 0; i < obj.buttons.length; i++) {
		if (obj.buttons[i].payload.includes('http')) {
			type = 'web_url';
			method = 'url';
		} else {
			type = 'postback';
			method = 'payload';
		}
		let singleBtn = {
			type: type,
			title: obj.buttons[i].title
		};
		singleBtn[method] = obj.buttons[i].payload;
		buttons.push(singleBtn);
	}

	return {
		messageData: {
			attachment: {
				type: "template",
				payload: {
					template_type: "button",
					text: message,
					buttons: buttons
				}
			}
		}
	};
};

module.exports = buttonTemplate;
