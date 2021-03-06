const { isValidObjectId } = require("mongoose");
const db = require("../models");
const os = require('os');
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

    //Save font in the database
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

    const myCustomLabels = {
        totalDocs: 'totalFonts',
        docs: 'data',
        limit: 'limit',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'totalPages',
        pagingCounter: 'pagingCounter',
        //meta: 'paginator'
    };

    const options = {
        //page: req.params.page || 1,
        //limit: 20,
        //collation: {
         // locale: 'pt'
        //},
        sort: {createdAt: -1}
        //customLabels: myCustomLabels
    };
    title: title
    Font.find({ title: title }, {}, function(err, result) {
    //Font.paginate({ title: title }, options, function(err, result) {
        if (err) {
            return next(err);
        }
        else{
            res.send(result);
        }
    }).sort({createdAt : -1});
};

// Retrieve all font from the database.
exports.findAll = (req, res) => {

    const myCustomLabels = {
        totalDocs: 'totalFonts',
        docs: 'data',
        limit: 'limit',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'totalPages',
        pagingCounter: 'pagingCounter',
        //meta: 'paginator'
    };

    const options = {
        page: req.params.page || 1,
        limit: 20,
        collation: {
          locale: 'pt'
        },
        sort: {createdAt: -1},
        customLabels: myCustomLabels
    };
 
    Font.find({}, {}, function(err, result) {
        if (err) {
            return next(err);
        }
        else{
            res.send(result);
        }
    }).sort({createdAt : -1});
};

// Find a single font with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Font.findById(id)
        .then(data => {
        if (data.length == 0)
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
    const filter = { _id : id }

    Font.findOneAndUpdate(filter, req.body, { useFindAndModify: false })
        .then(data => {
        if (data.length == 0) {
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
    const filter = { _id : id }
    Font.findOneAndRemove(filter)
        .then(data => {
        if (data.length == 0) {
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
exports.findPublished = (req, res) => {

    const myCustomLabels = {
        totalDocs: 'totalFonts',
        docs: 'data',
        limit: 'limit',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'totalPages',
        pagingCounter: 'pagingCounter',
        //meta: 'paginator'
    };

    const options = {
        page: req.params.page || 1,
        limit: 20,
        collation: {
          locale: 'pt'
        },
        sort: {createdAt: -1},
        customLabels: myCustomLabels
    };

    Font.find({published: true}, {}, function(err, result) {
    //Font.paginate({ published: true }, options, function(err, result) {
        if (err) {
            return next(err);
        }
        else{
            res.send(result);
        }
    }).sort({createdAt : -1});
};

// Publish a font by the id in the request
exports.publishFont = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    const filter = { _id : id }
    const update = req.body;

    Font.findByIdAndUpdate( filter, update , { useFindAndModify: false } )
        .then(data => {
        if (data.length == 0) {
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

// Find all Unpublished font
exports.findUnpublished = (req, res) => {

    const myCustomLabels = {
        totalDocs: 'totalFonts',
        docs: 'data',
        limit: 'limit',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'totalPages',
        pagingCounter: 'pagingCounter',
        //meta: 'paginator'
    };

    const options = {
        page: req.params.page || 1,
        limit: 20,
        collation: {
          locale: 'pt'
        },
        sort: {createdAt: -1},
        customLabels: myCustomLabels
    };

    Font.find({published: false}, {}, function(err, result) {
    //Font.paginate({ published: false }, options, function(err, result) {
        if (err) {
            return next(err);
        }
        else{
            res.send(result);
        }
    }).sort({createdAt : -1});
};