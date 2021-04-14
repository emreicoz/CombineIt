import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container, Content, Card, CardItem} from 'native-base';
export default class CardImageExample extends Component {
  render() {
    return (
          <Card style={{height: 85, width: 85,justifyContent:'center',alignItems:'center',borderRadius: 10,}}>
            <CardItem cardBody  >
              <Image
                source={this.props.clothe}
                style={{height: 75, width: 75}}
              />
            </CardItem>
          </Card>
    );
  }
}
