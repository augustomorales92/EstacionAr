import React   from "react";
import { format } from "./format";
import { Container,  Text} from 'native-base';
import {styles} from './clockStyle'



export default ({time}) => {


  
  return (
      <Container style={styles.container}>
          
              <Text style={styles.clock}>
              {format(time)}
              </Text>
         
      </Container>
  
 
)
}
