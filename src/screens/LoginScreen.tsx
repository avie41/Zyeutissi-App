
import React,{useState} from 'react';
import { StyleSheet,Image, Text, View, TextInput, TouchableOpacity, Switch } from 'react-native';
import {Asset} from 'expo-asset';
const LoginScreen = () => {
  // Gestion du switch, à utiliser pour le mode anglais ou français
  // false -> default (français)
  // true -> english
  // i18n
  const [language, setLanguage] = useState(false);
  const changeLanguage = () => setLanguage(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.languageView}>
        <Text style={styles.forgot}>Choix du language</Text>
        <Switch
          trackColor={{ false: "#2a4e9c", true: "#096a09" }}
          thumbColor={language ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={changeLanguage}
          value={language}
        />
        <Text style={styles.forgot}>{language ? "En" : "Fr"}</Text>
      </View>
      <Image
        style={styles.logoImage}
        source={{
          uri: Asset.fromModule(require('./ZieuTissi.png')).uri,
        }}
      />
      <Text style={styles.logoText}>Votre éditeur de vidéo "maison"</Text>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Identifiant"
          placeholderTextColor="#bdbdbd"
          onChangeText={text => {}}/>
      </View>
      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Mot de passe"
          placeholderTextColor="#bdbdbd"
          onChangeText={text => {}}/>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.signUpText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageView:{
    alignItems:"center"
  },
  logoImage: {
    width: 231,
    height: 231,
  },
  logoText:{
    textAlign: "center",
    fontSize:25,
    width:187,
    height:58,
    color:"#2a4e9c",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    borderBottomColor:"#616161",
    borderBottomWidth:1,
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"#bdbdbd",
    fontSize:11,
  },
  loginBtn:{
    width:176,
    backgroundColor:"#2a4e9c",
    borderRadius:25,
    height:52,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText: {
    color:"white",
    fontSize:16,
    fontWeight:"bold"
  },
  signUpText: {
    marginTop:10,
    color:"#2a4e9c",
    fontSize:16
  }
});

export default LoginScreen;
