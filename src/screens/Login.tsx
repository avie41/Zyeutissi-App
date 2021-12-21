import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, KeyboardAvoidingView, Linking, Platform, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import { signIn, signInWithGoogle } from '../services/firebaseMethods';
import {useTheme, useTranslation} from '../hooks';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components';
import firebase from 'firebase';

const isAndroid = Platform.OS === 'android';

interface IRegistration {
  email: string;
  password: string;
}
interface IRegistrationValidation {
  email: boolean;
  password: boolean;
}

const Login = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  // TODO toggle eye to be implemented
  //const [hidePassword, setHidePassword] = useState(true);
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    email: false,
    password: false
  });
  const [registration, setRegistration] = useState<IRegistration>({
    email: '',
    password: ''
  });
  const {assets, colors, gradients, sizes} = useTheme();

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({...state, ...value}));
    },
    [setRegistration],
  );

  const handleSignIn = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      /** send/save registratin data */
      signIn(registration.email, registration.password);
      navigation.navigate('Home');
    }
  }, [isValid, registration]);

  const handleSignUpWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    signInWithGoogle(provider);
    navigation.navigate('Home');
  }

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
    }));
  }, [registration, setIsValid]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.sm} paddingVertical={sizes.sm}>
        <Block flex={0} style={{zIndex: 0}}>    
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.blue}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text p white marginLeft={sizes.s} color={colors.blue}>
                {t('common.goBack')}
              </Text>
            </Button>
        </Block>
        {/* register form */}
        <Block
          keyboard
          showsVerticalScrollIndicator={false}
          behavior={!isAndroid ? 'padding' : 'height'}
          style={{zIndex: 0}}
          >
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
          <Block paddingHorizontal={sizes.sm} align='center'>
            <Image
              width={231}
              height={231}
              source={assets.zyeutissi}
              marginTop={sizes.xs}
              marginBottom={sizes.m}
            />
            </Block>  
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
               <Block>
                  <Image 
                  resizeMode='stretch'
                    source={assets.mail}
                    height={25}
                    width={23}
                    marginBottom={sizes.m}
                    color={colors.icon}
                    style={{position: 'absolute' ,top:40}}
                  />
                  <Input
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    paddingLeft={40}
                    label={t('common.email')}
                    keyboardType="email-address"
                    placeholder={t('common.emailPlaceholder')}
                    success={Boolean(registration.email && isValid.email)}
                    danger={Boolean(registration.email && !isValid.email)}
                    onChangeText={(value) => handleChange({email: value})}                  
                  />
                </Block>
                <Block>
                <Image 
                  resizeMode='stretch'
                    source={assets.password}
                    height={25}
                    width={25}
                    color={colors.icon}
                    style={{position: 'absolute' ,top:40}}
                  />
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.password')}
                  paddingLeft={40}
                  placeholder={t('common.passwordPlaceholder')}
                  onChangeText={(value) => handleChange({password: value})}
                  success={Boolean(registration.password && isValid.password)}
                  danger={Boolean(registration.password && !isValid.password)}
                />
                <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                <Text align='center'>
                  {t('common.forgotPassword')}
                </Text>
                </TouchableOpacity>
                </Block>
              </Block>
              <Block row paddingVertical={sizes.m}>
              <Button
                onPress={handleSignIn}                
                marginHorizontal={sizes.sm}
                height={50}
                width={200}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false)}>
                <Text bold white transform="uppercase">
                  {t('common.signin')}
                </Text>
              </Button>
              
              <Button radius={sizes.m} style={{width:5, height:5}} outlined color={colors.blue} shadow={!isAndroid} onPress={handleSignUpWithGoogle}>
                  <Image
                  style={{alignSelf:'center'}}
                    source={assets.google}
                    height={sizes.m}
                    width={sizes.m}
                    color={colors.blue}
                  />
              </Button>
              </Block>
              <Button
                primary
                outlined
                shadow={!isAndroid}
                marginHorizontal={sizes.sm}
                onPress={() => navigation.navigate('Register')}>
                <Text bold primary transform="uppercase">
                  {t('common.signup')}
                </Text>
              </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Login;
