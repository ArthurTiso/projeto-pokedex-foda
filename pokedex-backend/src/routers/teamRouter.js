const express = require("express");
const router = express.Router();
const { zodValidation } = require("../middlewares/zodValidation");
const { createTeamSchema, updateTeamSchema } = require("../validations/teamValidation");
const teamController = require("../controllers/teamController");

router.post("/", zodValidation(createTeamSchema), teamController.createTeam);
router.get("/", teamController.getAllTeams);
router.get("/:id", teamController.getTeamById);
router.put("/:id", zodValidation(updateTeamSchema), teamController.updateTeam);
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
