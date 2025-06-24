const express = require("express");
const router = express.Router();
const { createTeam, getAllTeams, updateTeam, deleteTeam } = require("../controllers/teamController");
const { createTeamSchema, updateTeamSchema } = require("../validations/teamValidation");
const { zodValidation } = require("../middlewares/zodValidation");

router.post("/", zodValidation(createTeamSchema), createTeam);
router.get("/", getAllTeams);
router.put("/:id", zodValidation(updateTeamSchema), updateTeam);
router.delete("/:id", deleteTeam);

module.exports = router;
