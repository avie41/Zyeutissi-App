
import React, {useCallback} from 'react';
import {Platform, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';

const isAndroid = Platform.OS === 'android';


const SwitchMode = () => {
  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();
  
  return (
    <Block safe marginTop={sizes.md}>
      <Block
          scroll
          paddingHorizontal={sizes.padding}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>  
          <Block align='center'>
          <Image
              width={240}
              height={240}
              source={assets.zyeutissi}
            />
            <Text h4 marginBottom={sizes.s} marginTop={sizes.sm} color = {colors.blue} align = 'center'>
                Je souhaite...
            </Text>
          </Block>

          
          <Block
            flex={0}
            marginTop={sizes.xxl}
            align='center'
          >            
          <Button              
              flex={0}
              color={colors.card}
              padding={sizes.padding}
              width={270}
              onPress={() => navigation.navigate("Home")}>
              <Image              
                width={100}
                height={80}              
                source={assets.zyeuter}
                style={{position: 'relative', top: -60}}
                marginBottom={-60}                        
              />
              <Text h4 color = {colors.blue} align='center' marginBottom={5}>
                Zyeuter         
              </Text>
              <Text h5 color = {colors.blue}>
                Visionner nos vidéos
              </Text>

          </Button>
          </Block>

          <Block
            flex={0}
            marginTop={sizes.xxl}
            align='center'
          >            
          <Button              
              flex={0}
              color={colors.card}
              padding={sizes.padding}
              width={270}
              onPress={() => navigation.navigate("ToDevelop")}>
              <Image              
                width={100}
                height={80}              
                source={assets.transmettre}
                style={{position: 'relative', top: -60}}
                marginBottom={-60}                        
              />
              <Text h4 color = {colors.blue} align='center' marginBottom={5}>
                Transmettre         
              </Text>
              <Text h5 color = {colors.blue}>
                Exposer vos vidéos
              </Text>

          </Button>
          </Block>
        </Block>
      </Block>
    </Block>
    );
  };
  
  export default SwitchMode;
  
