const db = require("../models");
const Font = db.fonts;

// Create and Save a new font
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a font
    var font = new Font({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
        publishDate: req.body.publishDate,
        environment: req.body.environment,
        user: req.body.user
    });
    
    // Save font in the database
    font.save(font)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the font."
            });
        });
};

// Find a single Font with an id
exports.findTitle = (req, res) => {
    const title = req.params.title;

    Font.find({ title: title})
        .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found font with title " + title });
        else res.send(data);
        })
        .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving font with title = " + title });
    });
};

// Retrieve all font from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Font.find(condition)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving fonts."
        });
    });
};

// Find a single font with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Font.findById(id)
        .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found font with id " + id });
        else res.send(data);
        })
        .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving font with id=" + id });
    });
};

// Update a font by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Font.findOneAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update font with id=${id}. Maybe font was not found!`
            });
        } else res.send({ message: "font was updated successfully." });
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating font with id=" + id
        });
    });
};

// Delete a font with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Font.findOneAndRemove(id)
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete font with id=${id}. Maybe font was not found!`
            });
        } else {
            res.send({
            message: "font was deleted successfully!"
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete font with id=" + id
        });
    });
};

// Delete all font from the database.
exports.deleteAll = (req, res) => {
    Font.deleteMany({})
        .then(data => {
        res.send({
            message: `${data.deletedCount} fonts were deleted successfully!`
        });
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all fonts."
        });
    });
};

// Find all published font
exports.findAllPublished = (req, res) => {
    Font.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving fonts."
        });
    });
};