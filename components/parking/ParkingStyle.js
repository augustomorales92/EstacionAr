import{StyleSheet} from 'react-native'


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      height: '100%',
      },
      colores:{
          fontSize:30,
          textAlign:'center',

      },
      cardStyle:{
          borderRadius:15,
          backgroundColor:'white',
          textAlign:'center',
          height:200,
          
          },
    card2Style:{
        borderRadius:15,
        opacity:0.7,
        marginTop:80,
        
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
        marginRight:30,
        marginLeft:30
      },
    texto:{
        fontSize:30,
        textAlign:'center',
        textAlignVertical:'center',
        marginTop:35,
        marginLeft:45
    },
    button:{
        width:80,
        height:80
    },
    camera:{
        fontSize:30,
        marginTop:15
    },
    labelstyle:{
        color:'black',
        textAlign:'center'
    },
   
  input: {
      borderWidth: 1,
      borderColor: 'black'
    },
    code:{
        marginTop:50
    }
})
