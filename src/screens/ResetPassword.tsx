import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
// import { resetPassword } from '../services/firebaseMethods'
import * as regex from '../constants/regex';
import { Block, Button, Input, Image, Text, Modal } from '../components';
import { useTheme, useTranslation } from '../hooks';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const isAndroid = Platform.OS === 'android';

const ResetPassword = () => {
  const auth = getAuth();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState(false);
  const [showModal, setModal] = useState(false);
  const [mail, setMail] = useState('');
  const { assets, colors, gradients, sizes } = useTheme();

  const handleChange = useCallback(
    (value) => {
      setMail(value);
    },
    [setMail],
  );

  const handleSubmit = useCallback(() => {
    if (isValid) {
      sendPasswordResetEmail(auth, mail)
      setModal(true);
      //navigation.navigate('Login');
    }
  }, [isValid, setModal]);

  useEffect(() => {
    setIsValid((state) => (regex.email.test(mail)));
  }, [mail, setIsValid]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.sm} paddingVertical={sizes.sm}>
        <Block flex={0} style={{ zIndex: 0 }}>
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
              transform={[{ rotate: '180deg' }]}
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
                <Text p > Veuillez saisir une adresse mail pour pouvoir réinitialiser votre mot de passe</Text>
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
                  success={Boolean(mail && isValid)}
                  danger={Boolean(mail && !isValid)}
                  onChangeText={(value) => handleChange(value)}
                />
              </Block>
            </Block>
            <Button
              onPress={handleSubmit}
              marginVertical={sizes.sm}
              marginHorizontal={sizes.sm}
              gradient={gradients.primary}
              disabled={(!isValid)}>
              <Text bold white transform="uppercase">
                {t('common.resetPassword')}
              </Text>
            </Button>
            <Modal visible={showModal} onRequestClose={() => setModal(false)}>
              <Text align='center' p white semibold transform="uppercase">
                L'email a bien été envoyé !
              </Text>
            </Modal>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default ResetPassword;
