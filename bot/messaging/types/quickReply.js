const quickReply = (obj) => {
	let quickReplies = [];
	for (let i = 0; i < obj.quick_replies.length; i++) {
		let reply = {
			'content_type': obj.quick_replies[i].type
		};
		if (obj.quick_replies[i].type !== 'location') {
			reply.title = obj.quick_replies[i].title;
			reply.payload = obj.quick_replies[i].payload;
		}
		if (obj.quick_replies[i].image) {
			reply.image_url = obj.quick_replies[i].image;
		}
		quickReplies.push(reply);
	}
	return {
		messageData: {
			text: obj.text,
			quick_replies: quickReplies
		}
	};
};

module.exports = quickReply;
