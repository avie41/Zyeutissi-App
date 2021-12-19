
import React, {useCallback} from 'react';
import {Platform, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';

const isAndroid = Platform.OS === 'android';


{/* <View style={styles.container}>
<Image
style={styles.logoImage}
source={{
  uri: Asset.fromModule(require('./ZieuTissi.png')).uri,
}}
/>
<Text style={styles.logoText}>Écran en développement</Text>
</View> */}


const ToDevelop = () => {
  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();
  
  return (
    <Block safe marginTop={sizes.md}>
      <Block
          scroll
          paddingHorizontal={sizes.s}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
            <Image
              radius={0}
              width={10}
              height={18}
              color={colors.black}
              source={assets.arrow}
              transform={[{rotate: '180deg'}]}
            />
            <Text p white marginLeft={sizes.s} color={colors.black}>
            {t('common.goBack')}
            </Text>
        </Button>     
          <Block paddingHorizontal={sizes.sm} align='center'>
          <Image
              width={300}
              height={300}
              source={assets.zyeutissi}
            />
            <Text h4 marginBottom={sizes.s} marginTop={sizes.sm} align = 'center'>
                Écran en cours de développement
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
    );
  };
  
  export default ToDevelop;
  
