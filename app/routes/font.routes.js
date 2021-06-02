module.exports = app => {
  const fonts = require("../controllers/font.controller.js");
  
  var router = require("express").Router();

  // Create a new fonte
  router.post("/", fonts.create);

  // Retrieve all fontes
  //router.get("/:page", fonts.findAll);
  router.get("/:page", fonts.findAll);

  // Retrieve all published fontes
  router.get("/font/published/:page", fonts.findPublished);

  // Retrieve all published fontes
  router.get("/font/unpublished/:page", fonts.findUnpublished);

  // Retrieve a single fonte with id
  router.get("/font/:id", fonts.findOne);

  // Retrieve a single fonte with title
  router.get("/font/title/:title", fonts.findTitle);

  // Update a fonte with id
  router.put("/:id", fonts.update);

  // Publish a fonte with id
  router.put("/publish/:id", fonts.publishFont);

  // Delete a fonte with id
  router.delete("/:id", fonts.delete);

  // Delete all Fonts
  router.delete("/", fonts.deleteAll);

  app.use('/api/fonts', router);
};