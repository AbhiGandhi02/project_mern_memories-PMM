import User from '../models/User.js';

export const loginOrRegisterUser = async (req, res) => {
  // User info comes from the authMiddleware
  console.log(req.body, 'User info from Firebase:');
  console.log(req.user);
  const { email, uid } = req.user;
  const { firstName, lastName } = req.body;

  try {
    // Find a user by their Firebase UID. If they don't exist, create them.
    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      {
        $setOnInsert: {
          firstName,
          lastName,
          email,
          firebaseUid: uid,
        },
      },
      {
        new: true, // Return the new document if created
        upsert: true, // Create the document if it doesn't exist
      }
    );
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in login/register user:', error);
    res.status(500).json({ message: 'Something went wrong on the server.' });
  }
};