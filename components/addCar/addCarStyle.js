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
        justifyContent: 'center',
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
      labelstyle:{
        color:'black',
        textAlign:'center'
    },
    formStyle:{
        margin:20
    },
    itemStyle:{
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'black'
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
        

    }
  });
  