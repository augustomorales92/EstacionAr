import{StyleSheet} from 'react-native'


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      height: '100%',
      },
      colores:{
          fontSize:25,
          marginTop:20,
          color:'white'

      },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
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
        borderRadius:100,
        marginLeft:220
    },
  input: {
      borderWidth: 1,
      borderColor: 'black'
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
        marginRight:20,
        
    },
        colores2:{
            fontSize:30,
            marginTop:50
   
        },
        input: {
            backgroundColor:'black',
            borderRadius:10,
            opacity:0.5
            },
        input2:{
            backgroundColor:'orange',
            borderRadius:10,
            opacity:0.4
        },
        buttons:{
            backgroundColor:'black'
        }
        ,
        buttons2:{
            backgroundColor:'black',
            marginLeft:200
        }
})
