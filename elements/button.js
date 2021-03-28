import React from 'react-native';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

export default function PrimaryButton({text}) {
  return (
    <TouchableOpacity> 
      <View style={styles.primary}>
        <Text style={styles.primarytext}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primary: {
    height: 42,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#3498db',
  },
  primarytext: {
    color: 'white',
  },
});
