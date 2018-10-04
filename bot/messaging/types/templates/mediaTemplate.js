const mediaTemp = (obj) => {

	let element = [{
		media_type: obj.assetType,
		url: obj.url
	}];

	if (typeof element[0].url === 'object') {
		element[0].url = obj.url[Math.floor(Math.random() * obj.url.length)];
	}

	if (obj.buttons) {
		let buttons = [];
		for (let i = 0; i < obj.buttons.length; i++) {
			if (obj.buttons[i].payload === 'Share') {
				buttons.push({
					type: 'element_share'
				});
			} else {
				let type, method;
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
		}
		element[0].buttons = buttons;
	}

	let formattedMessage = {
		messageData: {
			attachment: {
				type: "template",
				payload: {
					template_type: "media",
					elements: element
				}
			}
		}
	};

	if (obj.next) formattedMessage.next = obj.next;

	return formattedMessage;
};

module.exports = mediaTemp;
