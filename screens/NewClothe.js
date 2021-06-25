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
} from 'react-native';
import ImagePickerModal from '../elements/ImagePickerModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Picker} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function NewClothe({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePict, setProfilePict] = useState();
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
      colorNameTR: 'Sarı',
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
      colorNameTR: 'Fuşya',
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
      colorName: 'Indigo',
      colorNameTR: 'İndigo',
      colorPath: require('../Colors/indigo.png'),
      colorCode: '#4B0082',
      colorPathh: 'indigo.png',
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
      colorNameTR: 'Kırmızı',
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
      colorNameTR: 'Mürdüm',
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
      colorNameTR: 'Yeşil',
      colorPath: require('../Colors/yesil.png'),
      colorCode: '#00FF00',
      colorPathh: 'yesil.png',
    },
    {
      colorName: 'MultipleColor',
      colorNameTR: 'Çok-Renkli',
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
    topCategory: '',
    category: '',
    mold: '',
    fabric: '',
    length: '',
    season: '',
    style: '',
  });
  const categoryData = [
    {
      title: 'Üst Giyim',
      data: [
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
          value: 'Ceket',
          label: 'Ceket',
          avatarSource: {
            uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
          },
        },
        {
          value: 'Büstiyer',
          label: 'Büstiyer',
          avatarSource: {
            uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
          },
        },
        {
          value: 'Gömlek',
          label: 'Gömlek',
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
          value: 'Tişört',
          label: 'Tişört',
          avatarSource: {
            uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
          },
        },
      ],
    },
    {
      title: 'Alt Giyim',
      data: [
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
          value: 'Şort',
          label: 'Şort',
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
    },
    {
      title: 'Tek Parça',
      data: [
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
    },
    {
      title: 'Ayakkabı',
      data: [
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
          value: 'Çizme',
          label: 'Çizme',
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
          value: 'Spor Ayakkabı',
          label: 'Spor Ayakkabı',
          avatarSource: {
            uri: 'https://img.icons8.com/cute-clipart/344/android.png',
          },
        },
        {
          value: 'Topuklu Ayakkabı',
          label: 'Topuklu Ayakkabı',
          avatarSource: {
            uri: 'https://img.icons8.com/cute-clipart/344/android.png',
          },
        },
      ],
    },
  ];
  const subCategoryData = {
    top: [
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
        value: 'Ceket',
        label: 'Ceket',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: 'Büstiyer',
        label: 'Büstiyer',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: 'Gömlek',
        label: 'Gömlek',
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
        value: 'Tişört',
        label: 'Tişört',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
    ],
    bottom: [
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
        value: 'Şort',
        label: 'Şort',
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
        value: 'Çizme',
        label: 'Çizme',
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
        value: 'Spor Ayakkabı',
        label: 'Spor Ayakkabı',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: 'Topuklu Ayakkabı',
        label: 'Topuklu Ayakkabı',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
    ],
  };
  const moldData = {
    top: [
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
        value: 'Bol',
        label: 'Bol',
      },
      {
        value: 'Dar',
        label: 'Dar',
      },
      {
        value: 'Havuç Kesim',
        label: 'Havuç Kesim',
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
        value: '',
        label: 'Ayakkabı için kalıp seçmenize gerek yoktur.',
      },
    ],
  };
  const fabricData = {
    top: [
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
        value: 'Deri',
        label: 'Deri',
      },
      {
        value: 'Süet',
        label: 'Süet',
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
        value: 'Uzun',
        label: 'Uzun',
      },
      {
        value: 'Kısa',
        label: 'Kısa',
      },
      {
        value: 'Askılı',
        label: 'Askılı',
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
        value: '',
        label: 'Ayakkabı için uzunluk seçmenize gerek yoktur.',
      },
    ],
  };
  const styleData = [
    {
      value: 'Günlük',
      label: 'Günlük',
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
      value: 'İlkbahar',
      label: 'İlkbahar',
    },
    {
      value: 'Yaz',
      label: 'Yaz',
    },
    {
      value: 'Sonbahar',
      label: 'Sonbahar',
    },
    {
      value: 'Kış',
      label: 'Kış',
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
    console.log('DAte effect çalıştı');
  }, [profilePict]);

  const uploadClothe = async () => {
    const currentuser = auth().currentUser;
    const imageRef = storage().ref(
      'users/' + currentuser.uid + '/clothes/' + clothe.id + '.png',
    );
    const uploadImage = async () => {
      await imageRef.putFile(profilePict.uri);
      const url = await imageRef.getDownloadURL();
      return url;
    };
    const tempurl = await uploadImage();
    await firestore()
      .collection('users')
      .doc(currentuser.uid)
      .collection('clothes')
      .doc()
      .set({
        clotheId: clothe.id,
        colorNameTR: clothe.colorNameTR,
        clotheTopCategory: clothe.topCategory,
        clotheCategory: clothe.category,
        clotheMold: clothe.mold,
        clotheFabric: clothe.fabric,
        clotheLength: clothe.length,
        clotheSeason: clothe.season,
        clotheStyle: clothe.style,
        clothePicture: tempurl,
      });
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
              {categoryData.map(category => (
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
              {clothe.topCategory == 'Üst Giyim' ? (
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
              ) : clothe.topCategory == 'Tek Parça' ? (
                subCategoryData.onePart.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Ayakkabı' ? (
                subCategoryData.shoe.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : (
                <Picker.Item label="Lütfen önce ana kategori seçiniz" />
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
              <View style={{flexDirection:'row'}}>
                <Text style={{alignSelf:'center',marginRight:20,fontSize:16}}>{clothe.colorNameTR}</Text>
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
            <Text>Kalıp: </Text>
            <Picker
              mode="dropdown"
              style={{maxWidth: 160}}
              selectedValue={clothe.mold}
              onValueChange={value => setClothe({...clothe, mold: value})}>
              {clothe.topCategory == 'Üst Giyim' ? (
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
              ) : clothe.topCategory == 'Tek Parça' ? (
                moldData.onePart.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Ayakkabı' ? (
                moldData.shoe.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : (
                <Picker.Item label="Lütfen önce ana kategori seçiniz" />
              )}
            </Picker>
          </View>
          <View style={styles.attribute}>
            <Text>Kumaş: </Text>
            <Picker
              mode="dropdown"
              style={{maxWidth: 160}}
              selectedValue={clothe.fabric}
              onValueChange={value => setClothe({...clothe, fabric: value})}>
              {clothe.topCategory == 'Üst Giyim' ? (
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
              ) : clothe.topCategory == 'Tek Parça' ? (
                fabricData.onePart.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Ayakkabı' ? (
                fabricData.shoe.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : (
                <Picker.Item label="Lütfen önce ana kategori seçiniz" />
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
              {clothe.topCategory == 'Üst Giyim' ? (
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
              ) : clothe.topCategory == 'Tek Parça' ? (
                lenghtData.onePart.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : clothe.topCategory == 'Ayakkabı' ? (
                lenghtData.shoe.map(category => (
                  <Picker.Item
                    label={category.label}
                    value={category.value}
                    key="0"
                  />
                ))
              ) : (
                <Picker.Item label="Lütfen önce ana kategori seçiniz" />
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
          <Text>Ekle</Text>
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
