module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            description: String,
            published: Boolean,
            publishDate: Date,
            environment: String,
            user: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    
    const Font = mongoose.model("Font", schema, 'fonts');
    return Font;
};