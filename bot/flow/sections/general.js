module.exports = {
	'intro': {
		message: [
			'Welcome to your first chat bot',
			'Random message 2',
			'Random message 3'
		],
		next: 'intro2'
	},
	'intro2': {
		message: 'Follow up message',
		next: 'main-menu'
	},
	'main-menu': {
		type: 'generic',
		elements: [
			{
				title: 'Go to Intro',
				subtitle: 'This is subtitle text and is optional.',
				image: 'https://www.google.com/img.jpg',
				buttons: [
					{
						title: 'Go to Hello World',
						payload: 'next:intro'
					}
				]
			},
			{
				title: 'This is an additional Card',
				subtitle: 'You can have up to 10 cards in a carousel',
				image: 'https://www.google.com/img.jpg',
				buttons: [
					{
						title: 'What time is it?',
						payload: 'whatsTheTime'
					}
				]
			},
			{
				title: 'Go to First node',
				image: 'https://www.google.com/img.jpg',
				buttons: [
					{
						title: 'Go to First node',
						payload: 'next:quick-reply'
					}
				]
			},
			{
				title: 'Go to Button Message',
				image: 'https://www.google.com/img.jpg',
				buttons: [
					{
						title: 'Go to First node',
						payload: 'next:button-template'
					}
				]
			}
		]
	},
	'quick-reply': {
		text: 'Quick reply text before choices',
		quick_replies: [
			{
				type: 'text',
				title: 'Intro',
				payload: 'next:intro'
			},
			{
				type: 'text',
				title: 'Main Menu',
				payload: 'next:main-menu'
			},
			{
				type: 'location'
			}
		]
	},
	'button-template': {
		type: 'button',
		text: 'FPO image sent above, followed by buttons listed below.',
		buttons: [
			{
				title: 'Attachment Message',
				payload: 'next:attachment-msg'
			},
			{
				title: 'Main Menu',
				payload: 'next:main-menu'
			},
			{
				title: 'Intro',
				payload: 'next:intro'
			}
		]
	},
	'attachment-msg': {
		src: 'image',
		url: [
			'https://www.google.com/img.jpg',
			'https://www.google.com/img2.jpg',
			'https://www.google.com/img3.jpg'
		],
		next: 'button-template'
	}
};
