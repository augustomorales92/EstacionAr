import{StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9B233',
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
        marginRight:20, 
      },
      input: {
        backgroundColor:'black',
        borderRadius:10,
        opacity:0.8,
        marginTop:30,
        borderColor:"black",
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
        button1:{
            backgroundColor:'black',
            },
            cardButton:{
                backgroundColor:'grey',
                width:150
                },
                centeredView: {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 22
                  },
                  modalView: {
                    margin: 10,
                    backgroundColor: "black",
                    borderRadius: 20,
                    padding: 35,
                    alignItems: "center",
                    shadowColor: "#000",
                    width:'80%',
                    opacity:0.9,
                    shadowOffset: {
                      width: 0,
                      height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5
                  },
                  button: {
                    padding: 10,
                    elevation: 2,
                    borderRadius:10
                  },
                 
                  buttonClose: {
                    backgroundColor: "black",
                    borderWidth: 2,
                    borderColor:'white'
                  },
                  textStyle: {
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center"
                  },
                  modalText: {
                    marginBottom: 15,
                    textAlign: "center",
                    color:'white',
                    fontSize:20
                  }
           
})
