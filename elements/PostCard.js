import React, { Component } from 'react';
import { Image, Text, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
export default class CardImageExample extends Component {
  render() {
    return (
      <Container style={{height:310}}>
        <Content >
          <Card style={{height:300}}>
            <CardItem>
              <Left>
                <Thumbnail source={this.props.profile} />
                <Body>
                  <Text>Deneme Kişisi</Text>
                  <Text style={styles.subText}>denemekisisi</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody style={{justifyContent:'center',alignItems:'center'}}>
              <Image source={this.props.clothe} style={{height: 150, width: 150}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  subText: {
    color: '#d3d3d3'
  }
})