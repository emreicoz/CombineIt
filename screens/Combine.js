import React, { useContext } from 'react';
import {View,Image} from 'react-native';
import {Text} from 'native-base';
import { UserContext } from '../elements/UserContext';

export default function Combine () {
    const {user} = useContext(UserContext);
    console.log("Kombin tarafı: " +user);
    return(
        <View>
            <Text>
                Kombin sayfası. 
            </Text>
        </View>
    )
}