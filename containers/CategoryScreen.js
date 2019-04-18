/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import axios from "axios";

// const instructions = Platform.select({
//   ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
//   android:
//     "Double tap R on your keyboard to reload,\n" +
//     "Shake or press menu button for dev menu",
// });

type Props = {};
export default class App extends Component<Props> {
  state = {
    category: "",
  };

  handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://172.16.1.172:8080/create-category",
        {
          title: this.state.category,
        }
      );

      console.log("cat", response.data);
      if (response.data._id) {
        const value = JSON.stringify(response.data);
        await AsyncStorage.setItem("categoryInfo", value);
        console.log("value", value);
        //redirection vers page Product
        this.props.navigation.navigate("Product", {
          title: response.data.title,
        });
        console.log("toto");
      } else {
        await AsyncStorage.setItem("categoryInfo", "");
        console.log(response.data);
        this.setState({ category: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log(this.state.category);
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Rentrez le nom d'une collection"
          onChangeText={category => this.setState({ category })}
        />
        <TouchableOpacity onPress={this.handleSubmit}>
          <Text>valider</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
  },
});
