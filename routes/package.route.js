const express = require("express");
const router = express.Router()
const packageController = require('../controller/package.controller')



router.route('/')
.get(packageController.getPackages)
.post(packageController.createPackage)

router.route('/bulk-update').patch(packageController.bulkUpdatePackage)

router.route('/bulk-delete').delete(packageController.bulkDeletePackage)

router.route('/:id').patch(packageController.updatePackage).delete(packageController.deletePackage)

module.exports = router