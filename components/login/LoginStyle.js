import { StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange'
     
    },
    
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginRight:20
      },
      signin: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
      },
      stretch: {
        width: 300,
        height: 270,
        resizeMode: 'stretch',
        
      },
      imagen:{
        flex:0.8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85%'
      },
      colores:{
        fontSize:20,
        backgroundColor:'black'
        },
    input: {
      backgroundColor:'black',
      borderRadius:10,
      opacity:0.5
      },
      clearButton:{
        color:'black'
      },
      colorInput:{
        color:'white'
      }
   
  });
  