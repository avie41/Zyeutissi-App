import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Linking, Platform, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components';
import { block } from 'react-native-reanimated';

const isAndroid = Platform.OS === 'android';

interface IRegistration {
  name: string;
  email: string;
  password: string;
  agreed: boolean;
}
interface IRegistrationValidation {
  name: boolean;
  email: boolean;
  password: boolean;
  agreed: boolean;
}

const Register = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    email: false,
    password: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    name: '',
    email: '',
    password: '',
    agreed: false,
  });
  const {assets, colors, gradients, sizes} = useTheme();

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({...state, ...value}));
    },
    [setRegistration],
  );

  const handleSignUp = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      /** send/save registratin data */
      console.log('handleSignUp', registration);
    }
  }, [isValid, registration]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
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
              marginTop={sizes.m}
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
                </Block>
              </Block>
              {/* checkbox terms */}
              <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
                <Checkbox
                  marginRight={sizes.sm}
                  checked={registration?.agreed}
                  onPress={(value) => handleChange({agreed: value})}
                />
                <Text paddingRight={sizes.s}>
                  {t('common.agree')}
                  <Text
                    semibold
                    onPress={() => {
                      Linking.openURL('https://zyeutissi.fr/');
                    }}>
                    {t('common.terms')}
                  </Text>
                </Text>
              </Block>
              <Button
                onPress={handleSignUp}
                marginVertical={sizes.md}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false)}>
                <Text bold white transform="uppercase">
                  {t('common.signin')}
                </Text>
              </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Register;
