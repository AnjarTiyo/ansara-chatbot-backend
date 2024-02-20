import { Document, Schema, model } from "mongoose";

interface IUSer {
  name: string;
  email: string;
  password: string;
  isMaster: boolean;
}

interface IUserDoc extends IUSer, Document {
  mathPassword: (pass: string) => Promise<boolean>;
}

const userSchema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isMaster: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.mathPassword = async function (enteredPassword: string) {
    return Bun.password.verifySync(enteredPassword, this.password)
};

// Hash password with Bun
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }

    this.password = await Bun.password.hash(this.password, {
        algorithm: 'bcrypt',
        cost: 6
    })
});

const User = model('User', userSchema);

export default User;