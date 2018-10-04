const express = require('express');
const router = express.Router();

router.route('/')
	.get((req, res) => {
		res.send('01000101');
	});

// for Facebook verification (only run when adding webhook to app)
router.route('/webhook/').get((req, res) => {
	if(req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
		console.log('Successfully verified token');
		res.send(req.query['hub.challenge']);
	} else {
		console.log('Error, wrong token');
		res.sendStatus(200);
	}
});


module.exports = router;
