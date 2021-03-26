import React from 'react';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import{StyleSheet,Image} from 'react-native'

const Userscars = () => {
    return (
        <Container style ={styles.container}>
        <Content>
          <List>
            <ListItem thumbnail >
              <Left>
                <Image  source={{ uri: 'https://www.comparaonline.com.ar/blog-statics/ar/uploads/2019/01/Patente-automotor.png' }} />
              </Left>
              <Body >
                <Text style ={styles.colores}>Tu Auto </Text>
                <Text note numberOfLines={1} style ={styles.colores}>modelo</Text>
              </Body>
              <Right>
                <Button dark>
                  <Text style ={styles.colores}>Editar</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      height: '100%',
      },
      colores:{
          color:'white',
          fontSize:20,
          marginLeft:10

      }
})


export default Userscars;