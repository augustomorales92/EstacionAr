import{StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      height: '100%',
      },
      colores:{
          fontSize:20,
          
          textAlign:'center',

      },
      cardStyle:{
          borderRadius:15,
          backgroundColor:'white',
          },
    card2Style:{
        borderRadius:15
        ,opacity:0.7
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginRight:20
      },
      input: {
        backgroundColor:'black',
        borderRadius:10,
        opacity:0.5,
        marginTop:30
        },
        colorText:{
          color:'white'
        },
        texto:{
            fontSize:25,
            textAlign:'justify',
            color:'white',
            marginTop:10,
            marginLeft:10,
           
        },
        titulo:{
            fontSize:20,
            textAlign:'center',
            color:'white',
            marginTop:10  
        },
        button:{
            backgroundColor:'black',
            },
            cardButton:{
                backgroundColor:'grey',
                width:150
                },
            buttonPositions:{
                marginLeft:80
            }
})
