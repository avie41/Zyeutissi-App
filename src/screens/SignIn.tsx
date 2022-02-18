import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useTheme, useTranslation } from '../hooks';
import * as regex from '../constants/regex';
import { Block, Button, Input, Image, Text } from '../components';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';



const isAndroid = Platform.OS === 'android';
const auth = getAuth();

interface IRegistration {
  email: string;
  password: string;
}
interface IRegistrationValidation {
  email: boolean;
  password: boolean;
}
WebBrowser.maybeCompleteAuthSession();
const Login = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  // TODO toggle eye to be implemented
  // const [hidePassword, setHidePassword] = useState(true);
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    email: false,
    password: false
  });
  const [registration, setRegistration] = useState<IRegistration>({
    email: '',
    password: ''
  });
  const { assets, colors, gradients, sizes } = useTheme();

  /* Google auth

  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "281151332018-a13u2ar30h7ep8ch1tpobeab78v2g80o.apps.googleusercontent.com",
    iosClientId: "281151332018-unfr1to4jbpe4dttpjj6hlpi0lqekc9g.apps.googleusercontent.com",
    expoClientId: "281151332018-ncguue3pp1igp284gpgl71vh0aihduhh.apps.googleusercontent.com"
  
  });
  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);
  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    console.log(userInfoResponse);
          userInfoResponse.json().then(data => {
          setUserInfo(data);
          console.log(userInfo.email);
        });
  */

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({ ...state, ...value }));
    },
    [setRegistration],
  );

  const handleSignIn = useCallback(async () => {
    if (!Object.values(isValid).includes(false)) {
      /** send/save registratin data */
      try {

        await signInWithEmailAndPassword(auth, registration.email, registration.password);

      } catch (error) {
        alert(error.message);
      }

    }
  }, [isValid, registration]);

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
        {/* register form */}
        <Block
          keyboard
          showsVerticalScrollIndicator={false}
          behavior={!isAndroid ? 'padding' : 'height'}
          style={{ zIndex: 0 }}
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
                  style={{ position: 'absolute', top: 40 }}
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
                  onChangeText={(value) => handleChange({ email: value })}
                />
              </Block>
              <Block>
                <Image
                  resizeMode='stretch'
                  source={assets.password}
                  height={25}
                  width={25}
                  color={colors.icon}
                  style={{ position: 'absolute', top: 40 }}
                />
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.password')}
                  paddingLeft={40}
                  placeholder={t('common.passwordPlaceholder')}
                  onChangeText={(value) => handleChange({ password: value })}
                  success={Boolean(registration.password && isValid.password)}
                  danger={Boolean(registration.password && !isValid.password)}
                />
                <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
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

              <Button
                // onPress={accessToken ? getUserData : () => { promptAsync({ showInRecents: true }) }}
                radius={sizes.m}
                style={{ width: 5, height: 5 }}
                outlined color={colors.blue}
                shadow={!isAndroid}>
                <Image
                  style={{ alignSelf: 'center' }}
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
              onPress={() => navigation.navigate("SignUp")}>
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
