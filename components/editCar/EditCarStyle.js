import { StyleSheet,View,Alert,Image } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      height: '100%',
      
     
    },
    
      stretch: {
        width: 200,
        height: 180,
        resizeMode: 'stretch',
        
      },
      fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginRight:20,
        marginLeft:10
      },
      imagen:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%'
      },
      
    input: {
      backgroundColor:'black',
      borderRadius:10,
      opacity:0.5,
      marginTop:30
      },
    texto:{
        fontSize: 30,
        fontWeight: "bold",
        color:'black',
        flex:1,
        marginTop:20,
        height:'100%',
        textAlign:'center'

    },
    colores:{
      fontSize:20,
      backgroundColor:'black'
      },
        colorInput:{
          color:'white'
        }
  });
  