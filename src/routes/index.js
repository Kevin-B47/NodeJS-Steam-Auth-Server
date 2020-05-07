var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	if (req.isAuthenticated()) {
		return res.status(200).json({ message: `Hey ${req.user.name}, how you doin` });
	} else {
		return res.status(200).json({ message: 'Hey unkown user, how you doin' });
	}
});

module.exports = router;
