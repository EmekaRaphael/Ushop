import crypto from "crypto";
import mongoose, {Schema} from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'user must have a name']
        },
        username: {
            type: String,
            required: [true, 'user must have a username'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'user must provide an email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        password: {
            type: String,
            required: [true, 'Please provide password'],
            minLength: 8,
            select: false
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm password'],
            validate: {
                validator: function(el) {
                    return el === this.password;
                },
                message: "Passwords do not match"
            }
        },
        role: {
            type: String,
            enum: [ "user", "admin" ],
            default: "user"
        }
    },
    {timestamps: true}
);

userSchema.pre("save", async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //deletes the password confirmation field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre("save", function(next) {
    if (!this.isModified("password") || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function(next) {
    //This points to the current query
    this.find({ active: { $ne: false } });
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    return false;
}

userSchema.methods.createResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

        // console.log({resetToken}, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model("User", userSchema);

export {User};