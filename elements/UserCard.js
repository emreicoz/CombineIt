import React, {Component} from 'react';
import {Image, Text} from 'react-native';
import {View, Card, CardItem, Right, Left} from 'native-base';
import {Icon} from 'react-native-elements';

export default class UserCard extends Component {
  render(props) {
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
                source={{uri: this.props.searchedUser.profilePicture}}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 100,
                }}
              />
            </View>
            <View style={{display: 'flex', padding: 10}}>
              <Text>{this.props.searchedUser.userName}</Text>
              <Text style={{color: '#6a6a6a', fontSize: 13}}>
                {this.props.searchedUser.email}
              </Text>
            </View>
          </Left>
          <Right>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="chevron-right"
                type="material-community"
                style={{marginLeft: 20}}
              />
            </View>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
