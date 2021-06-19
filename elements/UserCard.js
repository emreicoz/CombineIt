import React, {Component} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {View, Card, CardItem, Right, Left} from 'native-base';
import {Icon} from 'react-native-elements';
export default class UserCard extends Component {
  render() {
    return (
      <Card
        style={{
          height: 60,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <CardItem>
          <Left>
            <View>
              <Image
                source={{uri: this.props.user.profilePicture}}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 100,
                }}
              />
            </View>
            <View style={{display: 'flex', padding: 10}}>
              <Text>{this.props.user.userName}</Text>
              <Text style={{color: '#6a6a6a', fontSize: 13}}>
                {this.props.user.email}
              </Text>
            </View>
          </Left>
          <Right>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
              <TouchableOpacity
                style={{
                  borderRadius: 30,
                  backgroundColor: '#1ba1e2',
                  padding: 10,
                }}>
                <Text style={{color: 'white'}}>Takip Et</Text>
              </TouchableOpacity>
              <Icon name="chevron-right" type="material-community" style={{marginLeft:20,}}/>
            </View>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
