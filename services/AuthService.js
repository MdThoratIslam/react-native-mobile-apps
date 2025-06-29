import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseConfig';

export class AuthService {
  static async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
        message: 'সফলভাবে লগ ইন হয়েছে'
      };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error.code),
        code: error.code
      };
    }
  }

  static async signUp(email, password, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile with name
      await user.updateProfile({
        displayName: name
      });
      
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: name,
        },
        message: 'সফলভাবে নিবন্ধন হয়েছে'
      };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error.code),
        code: error.code
      };
    }
  }

  static async signOut() {
    try {
      await auth.signOut();
      return {
        success: true,
        message: 'সফলভাবে লগ আউট হয়েছে'
      };
    } catch (error) {
      return {
        success: false,
        error: 'লগ আউট করতে সমস্যা হয়েছে'
      };
    }
  }

  static getErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'এই ই-মেইল দিয়ে কোন অ্যাকাউন্ট পাওয়া যায়নি';
      case 'auth/wrong-password':
        return 'ভুল পাসওয়ার্ড';
      case 'auth/invalid-email':
        return 'অবৈধ ই-মেইল ঠিকানা';
      case 'auth/user-disabled':
        return 'এই অ্যাকাউন্টটি নিষ্ক্রিয় করা হয়েছে';
      case 'auth/email-already-in-use':
        return 'এই ই-মেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে';
      case 'auth/weak-password':
        return 'পাসওয়ার্ড খুবই দুর্বল';
      case 'auth/network-request-failed':
        return 'নেটওয়ার্ক সংযোগে সমস্যা';
      case 'auth/too-many-requests':
        return 'অনেকবার চেষ্টা করা হয়েছে, কিছুক্ষণ পর আবার চেষ্টা করুন';
      case 'auth/invalid-credential':
        return 'ভুল ই-মেইল বা পাসওয়ার্ড';
      default:
        return 'একটি অজানা সমস্যা হয়েছে';
    }
  }

  static getCurrentUser() {
    return auth.currentUser;
  }

  static onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
  }
}