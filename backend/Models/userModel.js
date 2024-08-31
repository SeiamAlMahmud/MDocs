const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // Unique constraint added
    email: { type: String, required: true, unique: true },    // Unique constraint added
    password: { type: String, required: true },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\+?[1-9]\d{1,14}$/.test(v); // Example: simple regex for international numbers
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    country: { type: String },
    gender: { type: String },
    active: { type: Boolean },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
