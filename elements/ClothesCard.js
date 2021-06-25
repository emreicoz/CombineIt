import React, {Component} from 'react';
import {Image} from 'react-native';
import {Card, CardItem} from 'native-base';
export default class ClotheCard extends Component {
  render() {
    return (
      <Card
        style={{
          height: 89,
          width: 89,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <CardItem cardBody>
          <Image
            source={{uri: this.props.clothe}}
            style={{height: 80, width: 80,borderRadius:10,}}
          />
        </CardItem>
      </Card>
    );
  }
}
