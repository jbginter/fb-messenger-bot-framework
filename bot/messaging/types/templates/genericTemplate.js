const genericTempResponse = (obj) => {
	let elements = [];
	for (let i = 0; i < obj.elements.length; i++) {
		let buttons = [],
			type,
			method;
		for (let x = 0; x < obj.elements[i].buttons.length; x++) {
			if (obj.elements[i].buttons[x].payload.includes('http')) {
				type = 'web_url';
				method = 'url';
			} else {
				type = 'postback';
				method = 'payload';
			}
			let singleBtn = {
				type: type,
				title: obj.elements[i].buttons[x].title
			};
			singleBtn[method] = obj.elements[i].buttons[x].payload;
			buttons.push(singleBtn);
		}

		let body = {
			title: obj.elements[i].title,
			image_url: obj.elements[i].image,
			buttons: buttons
		};

		if (obj.elements[i].subtitle) {
			body.subtitle = obj.elements[i].subtitle;
		}
		elements.push(body);
	}

	return {
		messageData: {
			attachment: {
				type: "template",
				payload: {
					template_type: "generic",
					elements: elements
				}
			}
		}
	};
};

module.exports = genericTempResponse;
