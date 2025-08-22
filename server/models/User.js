import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firebaseUid: { type: String, required: true, unique: true },
  // Can add more fields here later
});

export default mongoose.model('User', userSchema);