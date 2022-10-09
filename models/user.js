var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
var userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Nombre requerido "],
    },
    email: {
        type: String,
        unique: [true, "email ya existente!"],
        lowercase: true,
        trim: true,
        required: [true, "email requerido"],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} no es un correo valido!'
        }

    },
    role: {
        type: String,
        enum: ["normal", "admin"],
        required: [true, "un rolete?"]
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);