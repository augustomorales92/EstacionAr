import { StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange'
     
    },
    
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85%'
      },
      labelstyle:{
          color:'black',
          textAlign:'center'
      },
      colores:{
        fontSize:20,
        

    },
    input: {
        borderWidth: 1,
        borderColor: 'black'
      }
  });
  