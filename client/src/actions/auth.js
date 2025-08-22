import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, formData.email, formData.password);
    const idToken = await user.getIdToken();
    // For signin, we send an empty body
    const { data } = await api.signIn(idToken, {});

    dispatch({ type: AUTH, data: { ...data, token: idToken } });
    alert('You have successfully signed in!');
    router.push('/');
  } catch (error) {
    alert('Sign in failed. Please check your credentials.');
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    const idToken = await user.getIdToken();
    // For signup, we combine the names and send them in the body
    const { data } = await api.signIn(idToken, { 
      firstName: formData.firstName, 
      lastName: formData.lastName 
    });

    dispatch({ type: AUTH, data: { ...data, token: idToken } });
    alert('Sign up successful! Welcome.');
    router.push('/');
  } catch (error) {
    alert('Sign up failed. The email may already be in use.');
  }
};