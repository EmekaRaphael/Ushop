import mongoose, {Schema} from "mongoose";



const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'user must have a username'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'user must provide an email'],
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'Please provide password'],
            minLength: 8
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        img: {
            type: String
        },
    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);

export {User};