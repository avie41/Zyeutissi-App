import React, {useCallback, useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Divider} from 'react-native-elements';
import {Block, Button, Input, Image, Text, Modal} from '../components';
import { useTheme, useTranslation } from '../hooks';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const isAndroid = Platform.OS === 'android';

const HowItWorks = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, gradients, sizes} = useTheme();

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
          showsVerticalScrollIndicator={true}
          behavior={!isAndroid ? 'padding' : 'height'}
          style={{zIndex: 0}}
          >
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
          <Block  align='center'>
            <Image
              width={200}
              height={200}
              source={assets.zyeutissi}
              marginBottom={sizes.s}
            />
            <Text  h4 bold paddingBottom={sizes.l} align='center' color={colors.blue}>Votre éditeur de vidéo "maison"</Text>
  
            <Text  h5 paddingBottom={sizes.s} paddingRight={100}  color={colors.text}>Présentation du concept</Text>
            <Divider style={{alignSelf : 'stretch', height:5, maxWidth:35, marginLeft:3, backgroundColor : colors.blue}} />
            <Text  p paddingTop={sizes.s +5} color={colors.text} style={{textAlign:'justify', lineHeight:1}}>
              Un concept simple, tant pour les "Zyeuters" que pour nos créateurs de contenu.{"\n"}{"\n"}
              Zyeutissi est une application gratuite.{"\n"}{"\n"}
              Où l'on peut{"\n"}{"\n"}
              {"\t"}- Visionner des vidéos "amateur"{"\n"}
              {"\t"}- Exposer ses propres vidéos{"\n"}{"\n"}
              Des montages...{"\n"}{"\n"}
              {"\t"} ... courts 2 à 3 minutes{"\n"}
              {"\t"} ... sans personnages identifiables{"\n"}
              {"\t"} ... chacun peut s'y projeter.{"\n"}
              {"\t"} À tonalité positive.{"\n"}{"\n"}
              Diverses entrées possibles : par auteur, thème, lieu{"\n"}{"\n"}
              <Text  h4 paddingBottom={sizes.l} align='center' color={colors.blue}>Zyeutez, Transmettez, et, si vous appréciez, Partagez !</Text>
            



              
            </Text>
          </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};




export default HowItWorks;
