const express = require("express");
const router = express.Router();
const { userResInfo, skills, userResInfoUpdate } = require("../controllers/userController")
const { awardController, updateAwardController, deleteAwardController } = require('../controllers/awardsController')

router.post('/', userResInfo)
router.put('/updateRegistration', userResInfoUpdate)
router.put('/skills', skills)
router.put('/updateSkills', skills)
router.put('/awards', awardController)
router.put('/awards/update', updateAwardController)
router.delete('/awards/deleteAward', deleteAwardController)

 
module.exports = router;