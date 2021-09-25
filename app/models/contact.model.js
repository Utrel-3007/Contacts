
module.exports = Mongoose => {
    const schema = Mongoose.Schema(
        {
            name: {
                type: String,
                required: [true, "Contact name is required"],
            },
            email: {
                type: String,
                trim: true,
                lowercase: true,
            },
            address: String,
            phone: String,
            favorite: Boolean,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    
    return Mongoose.model("contact", schema);
}

