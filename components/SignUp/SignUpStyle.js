import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9B233",
    
    // height: "100%",
  },

  stretch: {
    width: 200,
    height: 180,
    resizeMode: "stretch",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginRight: 20,
  },
  imagen: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "35%",
  },
  labelstyle: {
    color: "black",
    textAlign: "center",
  },
  formStyle: {
    margin: 20,
  },
  itemStyle: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "black",
  },
  colores: {
    fontSize: 20,
    backgroundColor: "black",
    marginLeft:'30%',
    marginRight:'30%',
    marginTop:'3%',
    elevation: 2,
    borderRadius: 3,
  },
  input: {
    backgroundColor: "black",
    borderRadius: 10,
    opacity: 0.8,
    marginTop: 0,
    borderColor:"black",
  },
  colorInput: {
    color: "white",
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
});
