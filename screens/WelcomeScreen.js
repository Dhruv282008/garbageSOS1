import React from 'react';
import { ImageBackground,ScrollView, Modal, Alert, View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase'
import db from '../config'
import { RFValue } from "react-native-responsive-fontsize";


export default class WelcomeScreen extends React.Component{
    constructor() {
        super()
        this.state = {
            emailId: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            contact: "",
            confirmPassword: "",
            isModalVisible: false,
        };
        
    };

  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate("ComplaintScreen");
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

    userSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword) {
          return Alert.alert("password doesn't match\nCheck your password.");
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(emailId, password)
            .then(() => {
              db.collection("users").add({
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                contact: this.state.contact,
                email_id: this.state.emailId,
                address: this.state.address,
              });
              return Alert.alert("User Added Successfully", "", [
                {
                  text: "OK",
                  onPress: () => this.setState({ isModalVisible: false })
                }
              ]);
            })
            .catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              return Alert.alert(errorMessage);
            });
        }
      };
        
  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <ScrollView style={styles.scrollview}>
          <View style={styles.signupView}>
            <Text style={styles.signupText}> SIGN UP </Text>
          </View>
          <View style={{ flex: 0.95 }}>
            <Text style={styles.label}>First Name </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"First Name"}
              maxLength={12}
              onChangeText={text => {
                this.setState({
                  firstName: text
                });
              }}
            />

            <Text style={styles.label}>Last Name </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Last Name"}
              maxLength={12}
              onChangeText={text => {
                this.setState({
                  lastName: text
                });
              }}
            />

            <Text style={styles.label}>Contact </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Contact"}
              maxLength={10}
              keyboardType={"numeric"}
              onChangeText={text => {
                this.setState({
                  contact: text
                });
              }}
            />

            <Text style={styles.label}> Address </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Address"}
              multiline={true}
              onChangeText={text => {
                this.setState({
                  address: text
                });
              }}
            />

            <Text style={styles.label}>Email </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Email"}
              keyboardType={"email-address"}
              onChangeText={text => {
                this.setState({
                  emailId: text
                });
              }}
            />

            <Text style={styles.label}> Password </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Password"}
              secureTextEntry={true}
              onChangeText={text => {
                this.setState({
                  password: text
                });
              }}
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Confrim Password"}
              secureTextEntry={true}
              onChangeText={text => {
                this.setState({
                  confirmPassword: text
                });
              }}
            />
          </View>

          <View style={{ flex: 0.2, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() =>
                this.userSignUp(
                  this.state.emailId,
                  this.state.password,
                  this.state.confirmPassword
                )
              }
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            <Text
              style={styles.cancelButtonText}
              onPress={() => {
                this.setState({ isModalVisible: false });
              }}
            >
              Cancel
            </Text>
          </View>
        </ScrollView>
      </Modal>
    );
  };
    render() {
        return (
            <KeyboardAvoidingView style={{ backgroundColor: 'lightgreen', height: 1000}}>
                {this.showModal()}
                
                <ImageBackground
                source = {require('../assets/bg.jpg')}
                style={{ backgroundColor: 'lightgreen' , height: 1000}}>
                <Text style = {styles.header}>The Garbage SOS App</Text>

                <TextInput style={styles.input}
                    placeholder="Email-ID" />
                
                <TextInput style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password" />
                
                <TouchableOpacity
                    onPress = {()=>{this.userLogin(this.state.emailId, this.state.password);}}
                    style={styles.button}>
                    <Text style = {styles.text}>Log-In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                    this.setState({ isModalVisible: true })
                    }}
                    style={styles.button}
                >
                    <Text style = {styles.text}>Sign Up</Text>
                    </TouchableOpacity>
                    </ImageBackground>
                </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 5,
        borderRadius: 20,
        borderColor: 'yellow',
        padding: 10,
        width: 350,
        marginTop: 85,
        alignSelf: 'center',
        fontStyle: 'italic',
    },
    button: {
        alignSelf: 'center',
        backgroundColor: 'lightgreen',
        width: 265,
        height: 50,
        borderRadius: 20,
        marginTop: 85,
        shadowColor: "#000",
        shadowOffset: {
            width: 20,
            height: 8
        },
    },
    text: {
        textAlign: 'center',
        color: 'darkgreen',
        fontSize: 20,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop:9
    },
    header: {
        height: 50,
        width: 385,
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 40,
        borderRadius: 20,
        borderWidth: 5,
        borderColor: 'white',
        alignSelf: 'center'
    },
    registerButton: {
        width: "75%",
        height: RFValue(50),
        marginTop: RFValue(20),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(3),
        backgroundColor: "#32867d",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: RFValue(10)
      },
      registerButtonText: {
        fontSize: RFValue(20),
        fontWeight: "bold",
        color: "#fff"
      },
      cancelButtonText: {
        fontSize: RFValue(15),
        fontWeight: "bold",
        color: "#32867d",
        marginTop: RFValue(10)
    },
    registerButton: {
        width: "75%",
        height: RFValue(50),
        marginTop: RFValue(20),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(3),
        backgroundColor: "#32867d",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        }
    },
    
  formInput: {
    width: "90%",
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "black",
    paddingBottom: RFValue(10),
    marginLeft: RFValue(20),
    marginBottom: RFValue(14),
    },
  
    buttonText: {
        color: "#32867d",
        fontWeight: "300",
        fontSize: RFValue(12)
      },
      label: {
        fontSize: RFValue(13),
        color: "#717D7E",
        fontWeight: "bold",
        paddingLeft: RFValue(10),
        marginLeft: RFValue(20)
      },
      formInput: {
        width: "90%",
        height: RFValue(45),
        padding: RFValue(10),
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "grey",
        paddingBottom: RFValue(10),
        marginLeft: RFValue(20),
        marginBottom: RFValue(14),
        color: 'black'
      },
      registerButton: {
        width: "75%",
        height: RFValue(50),
        marginTop: RFValue(20),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(3),
        backgroundColor: "#32867d",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: RFValue(10)
      },
      registerButtonText: {
        fontSize: RFValue(20),
        fontWeight: "bold",
        color: "#fff"
      },
      cancelButtonText: {
        fontSize: RFValue(15),
        fontWeight: "bold",
        color: "#32867d",
        marginTop: RFValue(10)
      },
      scrollview: {
        flex: 1,
        backgroundColor: "lightblue",
        borderTopRightRadius: 20, 
      },
      signupView: {
        flex: 0.05,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6fc0b8"
      },
      signupText: {
        fontSize: RFValue(20),
        fontWeight: "bold",
        color: "#32867d"
      },
})