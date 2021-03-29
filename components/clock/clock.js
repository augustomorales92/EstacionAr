import React   from "react";
import { format } from "./format";
import { SafeAreaView,  Text} from 'react-native';
import {styles} from './clockStyle'



export default ({time}) => {


  
  return (
      <SafeAreaView style={styles.container}>
          
              <Text style={styles.clock}>
              {format(time)}
              </Text>
         
      </SafeAreaView>
  
 
)
}
