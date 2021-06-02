import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

export default function CustomHeader({navigation}) {
    return(
        <View style={styles.hedaer}>
            <View>
                <Text style={styles.headertext}>Selamlar</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:
    {
        width: "100%",
        height: "100%",
        backgroundColor:"red",
    },
    headertext: {

    }
})