# Facebook Messenger Bot Framework v2

Bot Framework for easily setting up a FB bot. Tried to organize everything to make it easily understandable and easy to update for future updates. Make sure to `npm install` before anything.  

## Notes

Using non-existent images as placeholders in the sections folder under flow. This is still a work in progress but should work without issue if properly setup.

## Setup

You'll need a FB App and a Page in order to test out your bot. Set those up before anything else, and also make sure to have `ngrok` installed or some type of tunneling software in order to send/receive messages. If you've installed ngrok, just run `ngrok http 3000` if using the default port set. If you've changed from 3000, just type whatever port you've switched to using.

Inside your FB App, there should be a quick installation for Messenger. Click that and and follow the instructions for setup. You'll need to copy the `.env-example` file to create a new file named `.env` for your server variables. This is where you'll put your FB token and set your verification token string. This will verify your server once you have it spun up and your webhook shown through either ngrok or whatever tunneling software you're using.

Once this is all setup, you should be able to go to your page and message it. If you aren't receiving a response, check your server logs.

## Config

I've added the option to use `Bot.config()` to included additional data. This will be an object that accepts certain values to update your Flow, and determine your running environment currently. This bot includes default nodes to help you get started, but adding in certain values will overwrite those defaults. You can currently use `flow` or `env` to specify updated values with objects, with examples shown below.

An example of accepted values to send is provided below:
```
	{
		flow: {object to send of new nodes},
		env: "string to send, defaults to development if not (prod||production)"
	}
```

NOTE: if NODE_ENV is not set to production, the bot will use local db storage and not redis. It will also not post analytics data

**If no config set, the bot will default to its predefined values.**

The following would properly pass a new Flow object to your bot:

```
const newFlow = {
	'intro': {
		message: [
			'Passed intro node',
			'Passed message 2',
			'Passed message 3'
		],
		next: 'intro2'
	},
	'intro2': {
		message: 'We have overwritten the default nodes.'
	}
}

Bot.config({
	flow: newFlow
})
```

This would assume `Bot` is set to `index.js` inside the bot folder. Passing this object overwrites the `intro` and 'intro2' node already set in the default flow directory, and changes the overall flow of the bot. This also uses the formatting shown below to properly send messages.

`intro` and `intro2` and the names of each node, and how you can point your bot to wherever you want it to go. This is REQUIRED in order to tell your bot where you want it to go. The `next` key above for the `intro` node is how we tell it to go to the next node, and how it knows the name of the node to go into. We'll go into more examples below on chaining nodes.

### Format

I'll go through how to properly add new nodes to your bot and what are accepted values. We're sending objects that get properly formatted and sent to FB depending on what is sent. Also ALL nodes require a name that is then linked with it's object, so only going to include formatted objects.

 * Text Message
 ```
 @message - can be a string or array with string values to randomly select from
 @next(optional) - will go to next node defined

	{
	 	message: 'String to send',
	 	next: 'next-node'
	}
 ```

  * Attachment
 ```
 @src - type of attachment to send, accepted values: image, audio, video, file
 @url - string with url location of attachment, can be an array filled with values to randomize. MUST be the same type
 @next(optional) - will go to next node defined

	{
	 	src: 'image',
	 	url: 'url.com',
	 	next: 'next-node'
	}
 ```

  * Quick Reply
 ```
@text - string value to appear before button choices
@quick_replies - An array of buttons that are shown for the user to Click, can have up to 11
	_@type - Can either be set to text or location
	_@title - Copy to display inside button
	_@image(optional) - An image to display to the left of the title
	_@payload - What node to send the user to after clicking, required to have 'next:' before the node, otherwise will attempt to run a custom response

	{
	 	text: 'Quick reply text before choices',
	 	quick_replies: [
	 		{
	 			type: 'text',
	 			title: 'Title',
				image: 'image.url.com'
	 			payload: 'next:next-node'
	 		},
	 		{
	 			type: 'location'
	 		}
	 	]
	}
 ```

  * Templates
 Templates have multiple types (Button, Generic, Media, List), which all have a `type` key to define what template we're using. We'll go into detail below:

 -Button-
 ```
@type - always set to button
@text - text that appears above buttons
@buttons - array of buttons to send ranging from 1-3
	@title - copy to display for button
	@payload - payload either being a predefined node or http link

	{
		type: 'button',
		text: 'Text displayed above buttons',
		buttons: [
			{
				title: 'Title 1',
				payload: 'next:payloadToSend'
			},
			{
				title: 'Title 2',
				payload: 'http://www.google.com'
			}
		]
	}
 ```

 -Generic-
 ```
@type - always set to generic
@elements - cards to send, can range from 1-10
	@title - Title to be displayed below image
	@subtitle - (optional) copy displayed below title
	@image - image that is shown in card
	@buttons - range from 1-3 buttons to be used in card, examples below. structured the same as all button arrays

 {
 	type: 'generic',
 	elements: [
 		{
 			title: 'Go to Intro',
 			subtitle: 'This is subtitle text and is optional.',
 			image: 'https://s3.amazonaws.com/somebucket/image.jpg',
 			buttons: [
 				{
 					title: 'Go to Intro Node',
 					payload: 'next:intro'
 				}
 			]
 		},
 		{
 			title: 'This sends a custom response',
 			subtitle: 'You can have up to 10 cards in a carousel',
 			image: 'https://s3.amazonaws.com/somebucket/image.jpg',
 			buttons: [
 				{
 					title: 'Custom Response',
 					payload: 'whatsTheTime'
 				}
 			]
 		},
 		{
 			title: 'Go to Google',
 			image: 'https://s3.amazonaws.com/somebucket/image.jpg',
 			buttons: [
 				{
 					title: 'Google',
 					payload: 'http://www.google.com'
 				}
 			]
 		}
 	]
 }
 ```

-Media-
```
@type - always set to media
@assetType - can either be video or image
@url - URL location of asset, must be a facebook bound URL
@buttons - (optional) can include up to 3 buttons if desired (formatting the same as above)
@next - (optional) next node in the flow to go directly to

	{
		type: 'media',
		assetType: 'video',
		url: 'https://www.facebook.com/username/videos/123456789',
		next: 'intro'
	}
```
