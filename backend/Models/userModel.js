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
    },
    documents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doc",
            default: [],
        }
    ]
}, { timestamps: true });



// userSchema.pre('save', function(next) {
//     // 'this' refers to the document being saved
//     if (this.isNew && this.profileCompleted === undefined) {
//         this.profileCompleted = false; // Set default value for new users
//     }
//     next();
// });



const User = mongoose.model("User", userSchema);

module.exports = User;




// const User = require("../models/user"); // Adjust the path to your User model

// // Create a new user
// exports.createUser = async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Update an existing user
// exports.updateUser = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Update user properties
//         Object.assign(user, req.body);

//         // Apply logic to potentially set profileCompleted to false
//         if (req.body.profileCompleted === undefined) {
//             user.profileCompleted = false;
//         }

//         await user.save();
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };
