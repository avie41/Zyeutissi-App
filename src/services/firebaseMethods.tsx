import firebase from 'firebase';
import {Alert} from "react-native";
export async function registerNewUser(fullName: string, email: string, password: string) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    if (currentUser){
      db.collection("users")
        .doc(currentUser.uid)
        .set({
          fullName: fullName,
          email: currentUser.email,
        });
    }
  } catch (err:any) {
    Alert.alert("Erreur de connexion", err.message);
  }
}

export async function signIn(email: string, password: string) {
  try {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  } catch (err:any) {
    Alert.alert("Erreur lors de l'enregistrement du nouveau compte", err.message);
  }
}
export async function resetPassword(email: string){
  try {
    await firebase
       .auth()
       .sendPasswordResetEmail(email);
   } catch (err:any) {
     Alert.alert("Erreur lors de l'envoi du mail de réinitialisation", err.message);
   }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err:any) {
    Alert.alert('There is something wrong!', err.message);
  }
}

export async function signInWithGoogle(provider: firebase.auth.AuthProvider){  
  
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    const credential = result.credential as firebase.auth.OAuthCredential;    
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}