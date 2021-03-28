import{StyleSheet} from 'react-native'


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      height: '100%',
      },
      colores:{
          fontSize:25,
          textAlign:'center',

      },
      cardStyle:{
        borderRadius:15,
        backgroundColor:'orange',
        height:80,
        
        },
  card2Style:{
      borderRadius:15,
      marginTop:30,
  },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 35,
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
    },
    clock:{
        fontSize: 10,
        fontFamily: 'Courier-Bold',
        height:40,
       },
    lastButton:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginRight:20
    },
    cardStyle2:{
        borderRadius:15,
        backgroundColor:'orange',
        opacity:0.8,
        height:80,
        
        },
})
