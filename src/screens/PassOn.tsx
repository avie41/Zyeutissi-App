
import React, { useCallback, useState } from 'react';
import { Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import { Block, Button, Image, Text } from '../components';
import { useData, useTheme, useTranslation } from '../hooks';

const isAndroid = Platform.OS === 'android';


const PassOn = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { assets, colors, sizes } = useTheme();
  const [video, setVideo] = useState(null);

  const uploadVideo = async () => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setVideo(result);
    }

  }

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.padding }}>
        <Block flex={0}>
          <Block paddingHorizontal={sizes.sm} align='center'>
            <Image
              width={240}
              height={240}
              source={assets.zyeutissi}
            />
            <Text h4 marginBottom={sizes.l} marginTop={sizes.s} color={colors.blue} align='center'>
              {t('navigation.transmettre')}
            </Text>
          </Block>
          <Block align='center'>
            <Button
              flex={0}
              color={colors.card}
              padding={sizes.padding}
              width={270}
              onPress={() => uploadVideo()}>
              <Image
                width={45}
                height={45}
                source={assets.import}
              />
              <Text h5 color={colors.blue} align="center">
                Importer depuis votre appareil
              </Text>
            </Button>
            <Block
              row>
              <Image
                width={100}
                height={100}
                source={assets.transmettre}
                style={{ position: 'relative', zIndex: 2, left: 25 }}

              />
              <Button
                row
                flex={0}
                color={colors.card}
                padding={sizes.padding}
                height={70}
                onPress={() => navigation.navigate("PassOn")}
              >
                <Text h4 color={colors.blue} align='center' marginBottom={5}>
                  {t('navigation.transmettre')}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default PassOn;

