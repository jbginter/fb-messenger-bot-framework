const listTempResponse = (obj) => {
	let elements = [];
	for (let i = 0; i < obj.elements.length; i++) {
		let buttons = [];
		if (obj.elements[i].button) {
			let type,
				method;
			if (obj.elements[i].button[0].payload.includes('http')) {
				type = 'web_url';
				method = 'url';
			} else {
				type = 'postback';
				method = 'payload';
			}
			let singleBtn = {
				type: type,
				title: obj.elements[i].buttons[0].title
			};
			singleBtn[method] = obj.elements[i].buttons[0].payload;

			if (obj.elements[i].buttons[0].ext) {
				singleBtn.messenger_extensions = obj.elements[i].buttons[0].ext;
			}

			if (obj.elements[i].buttons[0].height) {
				singleBtn.webview_height_ratio = obj.elements[i].buttons[0].height;
			}

			if (obj.elements[i].buttons[0].fallback) {
				singleBtn.fallback_url = obj.elements[i].buttons[0].fallback;
			}
			buttons.push(buttons);
		}

		let body = {
			title: obj.elements[i].title,
			buttons: buttons
		};

		if (obj.elements[i].image_url) {
			body.image_url = obj.elements[i].image;
		}

		if (obj.elements[i].subtitle) {
			body.subtitle = obj.elements[i].subtitle;
		}

		if (obj.elements[i].default) {
			body.default_action = {
				type: "web_url",
				url: body.default_action.url
			};
			if (obj.elements[i].default.ext) {
				body.default_action.messenger_extensions = obj.elements[i].default.ext;
			}

			if (obj.elements[i].default.height) {
				body.default_action.webview_height_ratio = obj.elements[i].default.height;
			}

			if (obj.elements[i].default.fallback) {
				body.default_action.fallback_url = obj.elements[i].default.fallback;
			}
		}
		elements.push(body);
	}

	let messageData = {
		messageData: {
			attachment: {
				type: "template",
				payload: {
					template_type: "list",
					elements: elements
				}
			}
		}
	};

	if (obj.topElem) {
		messageData.messageData.attachment.payload.top_element_style = obj.topElem;
	}

	if (obj.button) {
		let type,
			method;
		if (obj.button[0].payload.includes('http')) {
			type = 'web_url';
			method = 'url';
		} else {
			type = 'postback';
			method = 'payload';
		}
		let singleBtn = {
			type: type,
			title: obj.button[0].title
		};
		singleBtn[method] = obj.button[0].payload;
		messageData.messageData.attachment.payload.buttons = [singleBtn];
	}

	return messageData;
};

module.exports = listTempResponse;
