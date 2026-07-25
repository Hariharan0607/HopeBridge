const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        location: {
      type: String,
        },
        role: {
            type: String,
            enum: ["donor","trust","admin"],
            default: "donor",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);