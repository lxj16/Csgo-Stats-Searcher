const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/:steamID", async function(req, res) {
  try {
    const headers = {
      "TRN-Api-Key": process.env.TRACKER_API_KEY
    };

    const { steamID } = req.params;

    const response = await fetch(
      `${process.env.TRACKER_API_URL}/profile/steam/${steamID}`,
      { headers }
    );
    const data = await response.json();

    if (data.errors && data.errors.length > 0) {
      return res.status(404).json({
        message:
          "The player either hasn't played CSGO or their profile is private."
      });
    }

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error"
    });
  }
});

module.exports = router;
