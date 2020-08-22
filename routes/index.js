const { Router } = require('express');
const router = Router();

router.use("/weather", require('./weather'));

module.exports = router;