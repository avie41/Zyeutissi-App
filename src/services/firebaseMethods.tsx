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
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err:any) {
    Alert.alert('There is something wrong!', err.message);
  }
}