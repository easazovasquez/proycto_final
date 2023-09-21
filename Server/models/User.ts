// models/User.ts
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: false,
   // unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  email: {
    type: String,
   required: false,
 },
 rol: {
  type: String,
 required: false,
},
 done: {
  type: Boolean,
  default: false,
},

}, {
  versionKey: false,
});

export default model('User', userSchema);

 