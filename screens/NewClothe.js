import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ImagePickerModal from '../elements/ImagePickerModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Picker} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function NewClothe({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePict, setProfilePict] = useState();
  const {currentUser} = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const launchCam = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setProfilePict(response);
        setModalVisible(false);
      }
    });
  };
  const launchImageLib = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      setModalVisible(false);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setProfilePict(response);
      }
    });
  };
  const colors = [
    {
      colorName: 'Antracite',
      colorNameTR: 'Antrasit',
      colorPath: require('../Colors/antrasit.png'),
      colorCode: '#383E42',
      colorPathh: 'antrasit.png',
    },
    {
      colorName: 'Yellow',
      colorNameTR: 'Sar??',
      colorPath: require('../Colors/sari.png'),
      colorCode: '#FFFF00',
      colorPathh: 'sari.png',
    },
    {
      colorName: 'White',
      colorNameTR: 'Beyaz',
      colorPath: require('../Colors/beyaz.png'),
      colorCode: '#FFFFFF',
      colorPathh: 'beyaz.png',
    },
    {
      colorName: 'Black',
      colorNameTR: 'Siyah',
      colorPath: require('../Colors/siyah.png'),
      colorCode: '#000000',
      colorPathh: 'siyah.png',
    },
    {
      colorName: 'Beige',
      colorNameTR: 'Bej',
      colorPath: require('../Colors/bej.png'),
      colorCode: '#F5F5DC',
      colorPathh: 'bej.png',
    },
    {
      colorName: 'Burgundy',
      colorNameTR: 'Bordo',
      colorPath: require('../Colors/bordo.png'),
      colorCode: '#800020',
      colorPathh: 'bordo.png',
    },
    {
      colorName: 'Ecru',
      colorNameTR: 'Ekru',
      colorPath: require('../Colors/ekru.png'),
      colorCode: '#C2B280',
      colorPathh: 'ekru.png',
    },
    {
      colorName: 'Fuchsia',
      colorNameTR: 'Fu??ya',
      colorPath: require('../Colors/fusya.png'),
      colorCode: 'FF00FF',
      colorPathh: 'fusya.png',
    },
    {
      colorName: 'Gray',
      colorNameTR: 'Gri',
      colorPath: require('../Colors/gri.png'),
      colorCode: '#808080',
      colorPathh: 'gri.png',
    },
    {
      colorName: 'Khaki',
      colorNameTR: 'Haki',
      colorPath: require('../Colors/haki.png'),
      colorCode: '#F0E68C',
      colorPathh: 'haki.png',
    },
    {
      colorName: 'Dark Green',
      colorNameTR: 'Koyu Ye??il',
      colorPath: require('../Colors/koyu-yesil.png'),
      colorCode: '#006400',
      colorPathh: 'koyu-yesil.png',
    },
    {
      colorName: 'Coffee',
      colorNameTR: 'Kahve',
      colorPath: require('../Colors/kahve.png'),
      colorCode: '#6f4e37',
      colorPathh: 'kahve.png',
    },
    {
      colorName: 'Red',
      colorNameTR: 'K??rm??z??',
      colorPath: require('../Colors/kirmizi.png'),
      colorCode: '#FF0000',
      colorPathh: 'kirmizi.png',
    },
    {
      colorName: 'NavyBlue',
      colorNameTR: 'Lacivert',
      colorPath: require('../Colors/lacivert.png'),
      colorCode: '#000080',
      colorPathh: 'lacivert.png',
    },
    {
      colorName: 'Blue',
      colorNameTR: 'Mavi',
      colorPath: require('../Colors/mavi.png'),
      colorCode: '#0000FF',
      colorPathh: 'mavi.png',
    },
    {
      colorName: 'Coral',
      colorNameTR: 'Mercan',
      colorPath: require('../Colors/mercan.png'),
      colorCode: '#ff7f50',
      colorPathh: 'mercan.png',
    },
    {
      colorName: 'Purple',
      colorNameTR: 'Mor',
      colorPath: require('../Colors/mor.png'),
      colorCode: '#6a0dad',
      colorPathh: 'mor.png',
    },
    {
      colorName: 'Damson',
      colorNameTR: 'M??rd??m',
      colorPath: require('../Colors/murdum.png'),
      colorCode: '#854c65',
      colorPathh: 'murdum.png',
    },
    {
      colorName: 'Pink',
      colorNameTR: 'Pembe',
      colorPath: require('../Colors/pembe.png'),
      colorCode: '#FFC0CB',
      colorPathh: 'pembe.png',
    },
    {
      colorName: 'Petrol',
      colorNameTR: 'Petrol',
      colorPath: require('../Colors/petrol.png'),
      colorCode: '#005f69',
      colorPathh: 'petrol.png',
    },
    {
      colorName: 'Turquoise',
      colorNameTR: 'Turkuaz',
      colorPath: require('../Colors/turkuaz.png'),
      colorCode: '#40E0D0',
      colorPathh: 'turkuaz.png',
    },
    {
      colorName: 'Orange',
      colorNameTR: 'Turuncu',
      colorPath: require('../Colors/turuncu.png'),
      colorCode: '#FFA500',
      colorPathh: 'turuncu.png',
    },
    {
      colorName: 'Green',
      colorNameTR: 'Ye??il',
      colorPath: require('../Colors/yesil.png'),
      colorCode: '#00FF00',
      colorPathh: 'yesil.png',
    },
    {
      colorName: 'MultipleColor',
      colorNameTR: '??ok-Renkli',
      colorPath: require('../Colors/cokrenkli.png'),
      colorCode: '#',
      colorPathh: 'cokrenkli.png',
    },
  ];
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [clothe, setClothe] = useState({
    id: '0',
    colorName: 'Black',
    colorNameTR: 'Siyah',
    colorPath: require('../Colors/siyah.png'),
    colorPathh: 'siyah.png',
    topCategory: 'Yok',
    category: 'Yok',
    mold: 'Yok',
    fabric: 'Yok',
    length: 'Yok',
    style: 'G??nl??k',
    season: '??lkbahar',
  });
  const topCategoryData = [
    {
      title: 'Se??iniz',
    },
    {
      title: '??st Giyim',
    },
    {
      title: 'Alt Giyim',
    },
    {
      title: 'Tek Par??a',
    },
    {
      title: 'Ayakkab??',
    },
  ];
  const subCategoryData = {
    top: [
      {
        value: '',
        label: 'Se??iniz',
      },
      {
        value: 'Atlet',
        label: 'Atlet',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: 'Bluz',
        label: 'Bluz',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: 'B??stiyer',
        label: 'B??stiyer',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: 'G??mlek',
        label: 'G??mlek',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: 'Kazak',
        label: 'Kazak',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: 'Sweatshirt',
        label: 'Sweatshirt',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: 'Ti????rt',
        label: 'Ti????rt',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
    ],
    bottom: [
      {
        value: '',
        label: 'Se??iniz',
      },
      {
        value: 'Etek',
        label: 'Etek',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: 'Kapri',
        label: 'Kapri',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: 'Pantolon',
        label: 'Pantolon',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '??ort',
        label: '??ort',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: 'Tayt',
        label: 'Tayt',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
    ],
    onePart: [
      {
        value: '',
        label: 'Se??iniz',
      },
      {
        value: 'Elbise',
        label: 'Elbise',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: 'Tulum',
        label: 'Tulum',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
    ],
    shoe: [
      {
        value: '',
        label: 'Se??iniz',
      },
      {
        value: 'Babet',
        label: 'Babet',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: 'Bot',
        label: 'Bot',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '??izme',
        label: '??izme',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: 'Mokasen',
        label: 'Mokasen',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: 'Sandalet',
        label: 'Sandalet',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: 'Spor Ayakkab??',
        label: 'Spor Ayakkab??',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: 'Topuklu Ayakkab??',
        label: 'Topuklu Ayakkab??',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
    ],
  };
  const moldData = {
    top: [
      {
        value: '',
        label: 'Se??iniz',
      },
      {
        value: 'Bol',
        label: 'Bol',
      },
      {
        value: 'Dar',
        label: 'Dar',
      },
      {
        value: 'Oversize',
        label: 'Oversize',
      },
      {
        value: 'Standart',
        label: 'Standart',
      },
    ],
    bottom: [
      {
        value: '',
        label: 'Se??iniz',
      },
      {
        value: 'Bol',
        label: 'Bol',
      },
      {
        value: 'Dar',
        label: 'Dar',
      },
      {
        value: 'Havu?? Kesim',
        label: 'Havu?? Kesim',
      },
      {
        value: 'Mom Fit',
        label: 'Mom Fit',
      },
      {
        value: 'Kargo',
        label: 'Kargo',
      },
      {
        value: 'Standart',
        label: 'Standart',
      },
      {
        value: 'Skinny',
        label: 'Skinny',
      },
    ],
    onePart: [
      {
        value: '',
        label: 'Se??iniz',
      },
      {
        value: 'Bol',
        label: 'Bol',
      },
      {
        value: 'Dar',
        label: 'Dar',
      },
      {
        value: 'Oversize',
        label: 'Oversize',
      },
      {
        value: 'Standart',
        label: 'Standart',
      },
    ],
    shoe: [
      {
        value: 'Yok',
        label: 'Ayakkab?? i??in kal??p se??menize gerek yoktur.',
      },
    ],
  };
  const fabricData = {
    top: [
      {
        value: '',
        label: 'Se??iniz',
      },
      {
        value: 'Penye',
        label: 'Penye',
      },
      {
        value: 'Dantel',
        label: 'Dantel',
      },
      {
        value: 'Pike',
        label: 'Pike',
      },
      {
        value: 'Pamuk',
        label: 'Pamuk',
      },
      {
        value: 'Keten',
        label: 'Keten',
      },
    ],
    bottom: [
      {
        value: '',
        label: 'Se??iniz',
      },
      {
        value: 'Kot',
        label: 'Kot',
      },
      {
        value: 'Kadife',
        label: 'Kadife',
      },
      {
        value: 'Deri',
        label: 'Deri',
      },
      {
        value: 'Saten',
        label: 'Saten',
      },
      {
        value: 'Keten',
        label: 'Keten',
      },
      {
        value: 'Pamuk',
        label: 'Pamuk',
      },
    ],
    onePart: [
      {
        value: '',
        label: 'Se??iniz',
      },
      {
        value: 'Kot',
        label: 'Kot',
      },
      {
        value: 'Kadife',
        label: 'Kadife',
      },
      {
        value: 'Deri',
        label: 'Deri',
      },
      {
        value: 'Saten',
        label: 'Saten',
      },
      {
        value: 'Keten',
        label: 'Keten',
      },
      {
        value: 'Pamuk',
        label: 'Pamuk',
      },
      {
        value: 'Dantel',
        label: 'Dantel',
      },
      {
        value: 'Penye',
        label: 'Penye',
      },
    ],
    shoe: [
      {
        value: '',
        label: 'Se??iniz',
      },
      {
        value: 'Deri',
        label: 'Deri',
      },
      {
        value: 'S??et',
        label: 'S??et',
      },
      {
        value: 'Bez',
        label: 'Bez',
      },
      {
        value: 'Suni-deri',
        label: 'Suni-deri',
      },
    ],
  };
  const lenghtData = {
    top: [
      {
        value: '',
        label: 'Se??iniz',
      },
      {
        value: 'Uzun',
        label: 'Uzun',
      },
      {
        value: 'K??sa',
        label: 'K??sa',
      },
      {
        value: 'Ask??l??',
        label: 'Ask??l??',
      },
      {
        value: '3/4-Boy',
        label: '3/4-Boy',
      },
      {
        value: 'Kolsuz',
        label: 'Kolsuz',
      },
    ],
    bottom: [
      {
        value: '',
        label: 'Se??iniz',
      },
      {
        value: 'Uzun',
        label: 'Uzun',
      },
      {
        value: 'Standart',
        label: 'Standart',
      },
      {
        value: 'Mini',
        label: 'Mini',
      },
      {
        value: 'Midi',
        label: 'Midi',
      },
    ],
    onePart: [
      {
        value: '',
        label: 'Se??iniz',
      },
      {
        value: 'Uzun',
        label: 'Uzun',
      },
      {
        value: 'Standart',
        label: 'Standart',
      },
      {
        value: 'Mini',
        label: 'Mini',
      },
      {
        value: 'Midi',
        label: 'Midi',
      },
    ],
    shoe: [
      {
        value: 'Yok',
        label: 'Ayakkab?? i??in uzunluk se??menize gerek yoktur.',
      },
    ],
  };
  const styleData = [
    {
      value: 'G??nl??k',
      label: 'G??nl??k',
    },
    {
      value: 'Resmi',
      label: 'Resmi',
    },
    {
      value: 'Spor',
      label: 'Spor',
    },
  ];
  const seasonData = [
    {
      value: '??lkbahar Yaz',
      label: '??lkbahar Yaz',
    },

    {
      value: 'Sonbahar K????',
      label: 'Sonbahar K????',
    },
  ];

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var uniqueid =
      date + '' + month + '' + year + '' + hours + '' + min + '' + sec;
    setClothe({...clothe, id: uniqueid});
    console.log('DAte effect ??al????t??');
  }, [profilePict]);

  const uploadClothe = async () => {
    setIsLoading(true);
    const imageRef = storage().ref(
      'users/' + currentUser.userId + '/clothes/' + clothe.id + '.png',
    );
    const uploadImage = async () => {
      await imageRef.putFile(profilePict.uri);
      const url = await imageRef.getDownloadURL();
      return url;
    };
    const tempurl = await uploadImage();
    await firestore()
      .collection('users')
      .doc(currentUser.userId)
      .collection('clothes')
      .doc()
      .set({
        clotheId: clothe.id,
        clotheGender: currentUser.gender,
        clotheColorNameTR: clothe.colorNameTR,
        clotheTopCategory: clothe.topCategory,
        clotheCategory: clothe.category,
        clotheMold: clothe.mold,
        clotheFabric: clothe.fabric,
        clotheLength: clothe.length,
        clotheSeason: clothe.season,
        clotheStyle: clothe.style,
        clothePicture: tempurl,
      });
    setIsLoading(false);
    navigation.popToTop();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity
            style={styles.profile}
            onPress={() => setModalVisible(true)}>
            <Image
              source={
                profilePict
                  ? {
                      uri: profilePict.uri,
                    }
                  : require('../images/panth1.png')
              }
              style={{width: 150, height: 150, borderRadius: 20}}
            />
          </TouchableOpacity>
        </View>
        <ImagePickerModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          launchCam={launchCam}
          launchImageLib={launchImageLib}
        />
        <View style={styles.attributes}>
          <View style={styles.attribute}>
            <Text>Ana Kategori: </Text>
            <Picker
              mode="dropdown"
              style={{maxWidth: 160}}
              selectedValue={clothe.topCategory}
              onValueChange={value =>
                setClothe({...clothe, topCategory: value})
              }>
              {topCategoryData.map(category => (
                <Picker.Item
                  label={category.title}
                  value={category.title}
                  key="0"
                />
              ))}
            </Picker>
          </View>
          <View style={styles.attribute}>
            <Text>Kategori: </Text>
            <Picker
              mode="dropdown"
              style={{maxWidth: 160}}
              selectedValue={clothe.category}
              onValueChange={value => setClothe({...clothe, category: value})}>
              {clothe.topCategory == '??st Giyim' ? (
                subCategoryData.top.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Alt Giyim' ? (
                subCategoryData.bottom.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Tek Par??a' ? (
                subCategoryData.onePart.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Ayakkab??' ? (
                subCategoryData.shoe.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : (
                <Picker.Item label="L??tfen ??nce ana kategori se??iniz" />
              )}
            </Picker>
          </View>

          <View style={styles.attribute}>
            <Text>Renk: </Text>
            <Modal
              animationType="fade"
              transparent={true}
              visible={colorModalVisible}
              onRequestClose={() => {
                setColorModalVisible(false);
              }}>
              <View style={{backgroundColor: '#000000aa', flex: 1}}>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => setColorModalVisible(false)}>
                  <TouchableWithoutFeedback>
                    <View style={styles.modal}>
                      <FlatList
                        key="#"
                        data={colors}
                        numColumns={6}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({item}) => (
                          <View style={{padding: 2}}>
                            <TouchableOpacity
                              onPress={() => {
                                console.log(item.colorPath);
                                setClothe({
                                  ...clothe,
                                  colorPath: item.colorPath,
                                  colorNameTR: item.colorNameTR,
                                });
                                setColorModalVisible(false);
                              }}>
                              <Image
                                source={item.colorPath}
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 50,
                                }}></Image>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </TouchableOpacity>
              </View>
            </Modal>
            <TouchableOpacity onPress={() => setColorModalVisible(true)}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{alignSelf: 'center', marginRight: 20, fontSize: 16}}>
                  {clothe.colorNameTR}
                </Text>
                <Image
                  source={clothe.colorPath}
                  style={{
                    marginRight: 8,
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                  }}></Image>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.attribute}>
            <Text>Kal??p: </Text>
            <Picker
              mode="dropdown"
              style={{maxWidth: 160}}
              selectedValue={clothe.mold}
              onValueChange={value => setClothe({...clothe, mold: value})}>
              {clothe.topCategory == '??st Giyim' ? (
                moldData.top.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Alt Giyim' ? (
                moldData.bottom.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Tek Par??a' ? (
                moldData.onePart.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Ayakkab??' ? (
                moldData.shoe.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : (
                <Picker.Item label="L??tfen ??nce ana kategori se??iniz" />
              )}
            </Picker>
          </View>
          <View style={styles.attribute}>
            <Text>Kuma??: </Text>
            <Picker
              mode="dropdown"
              style={{maxWidth: 160}}
              selectedValue={clothe.fabric}
              onValueChange={value => setClothe({...clothe, fabric: value})}>
              {clothe.topCategory == '??st Giyim' ? (
                fabricData.top.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Alt Giyim' ? (
                fabricData.bottom.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Tek Par??a' ? (
                fabricData.onePart.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Ayakkab??' ? (
                fabricData.shoe.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : (
                <Picker.Item label="L??tfen ??nce ana kategori se??iniz" />
              )}
            </Picker>
          </View>
          <View style={styles.attribute}>
            <Text>Uzunluk: </Text>
            <Picker
              mode="dropdown"
              style={{maxWidth: 160}}
              selectedValue={clothe.length}
              onValueChange={value => setClothe({...clothe, length: value})}>
              {clothe.topCategory == '??st Giyim' ? (
                lenghtData.top.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Alt Giyim' ? (
                lenghtData.bottom.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Tek Par??a' ? (
                lenghtData.onePart.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Ayakkab??' ? (
                lenghtData.shoe.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : (
                <Picker.Item label="L??tfen ??nce ana kategori se??iniz" />
              )}
            </Picker>
          </View>
          <View style={styles.attribute}>
            <Text>Tarz: </Text>
            <Picker
              mode="dropdown"
              style={{maxWidth: 160}}
              selectedValue={clothe.style}
              onValueChange={value => setClothe({...clothe, style: value})}>
              {styleData.map(category => (
                <Picker.Item
                  label={category.label}
                  value={category.value}
                  key="0"
                />
              ))}
            </Picker>
          </View>
          <View style={styles.attribute}>
            <Text>Mevsimlik Tercih: </Text>
            <Picker
              mode="dropdown"
              style={{maxWidth: 160}}
              selectedValue={clothe.season}
              onValueChange={value => setClothe({...clothe, season: value})}>
              {seasonData.map(category => (
                <Picker.Item
                  label={category.label}
                  value={category.value}
                  key="0"
                />
              ))}
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: profilePict ? 'tomato' : 'grey',
            borderRadius: 50,
            width: 80,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={uploadClothe}
          disabled={profilePict ? false : true}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Text>Ekle</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    margin: '2%',
  },
  profile: {
    flex: 1,
    backgroundColor: '#95a5a6',
    borderRadius: 20,
    borderColor: 'gray',
  },
  attributes: {
    padding: 15,
    alignContent: 'flex-end',
  },
  attribute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modal: {
    marginVertical: '50%',
    marginHorizontal: '19%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
  },
  colorView: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});
