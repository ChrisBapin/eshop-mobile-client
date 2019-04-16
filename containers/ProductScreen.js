import React from "react";
import {
  Text,
  View,
  AsyncStorage,
  StyleSheet,
  TextInput,
  ScrollView,
  Share,
} from "react-native";
import { TextField } from "react-native-material-textfield";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { ScrollView } from "react-native-gesture-handler";
import Axios from "axios";

class ProductScreen extends React.Component {
  state = {
    category: {},
    isLoading: true,
    title: "",
    description: "",
    price: "",
    size: "",
    quantity: "",
    picture: "",
    numberOfItem: 0,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Ajout de produit",
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: "600",
      },
    };
  };

  async componentDidMount() {
    let tempInfo = await AsyncStorage.getItem("categoryInfo");
    tempInfo = JSON.parse(tempInfo);
    // console.log("tempInfo", tempInfo);
    const response = await Axios.get("http://192.168.1.39:8080/get-category");
    console.log("response.data", response.data);
    this.setState({
      category: tempInfo,
      isLoading: false,
    });
  }

  handleClick = async () => {
    try {
      await Axios.post("http://192.168.1.39:8080/create-product", {
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        size: this.state.size,
        quantity: this.state.quantity,
        picture: this.state.picture,
        category: this.state.category._id,
      });
      this.setState({
        title: "",
        description: "",
        price: "",
        size: "",
        quantity: "",
        picture: "",
        numberOfItem: this.state.numberOfItem + 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  buttonAddProduct = () => {
    if (
      this.state.title !== "" &&
      this.state.description !== "" &&
      this.state.price !== "" &&
      this.state.size !== "" &&
      this.state.quantity !== ""
    ) {
      return (
        <View style={styles.iconAdd}>
          <TouchableOpacity onPress={this.handleClick}>
            <Icon name="plus" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        dialogTitle: "Voici les nouvelles offres",
        title: "Voici les nouvelles offres",
        message:
          "Voici les nouvelles offres visiblent sur http://www.test-app.com/" +
          this.state.category.url,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <View>
          <Text>chargement...</Text>
        </View>
      );
    } else {
      console.log(this.state);
      return (
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.numberOfItem}>
              <Text>{this.state.numberOfItem}</Text>
            </View>
            <Text style={styles.titleCate}>{this.state.category.title}</Text>
            <View style={styles.input}>
              <TextField
                label="Photo"
                value={this.state.picture}
                onChangeText={picture => {
                  this.setState({ picture });
                }}
              />
              <TextField
                label="Titre du produit"
                value={this.state.title}
                onChangeText={title => {
                  this.setState({ title });
                }}
              />
              <TextField
                label="Description du produit"
                value={this.state.description}
                multiline={true}
                editable={true}
                numberOfLines={4}
                onChangeText={description => {
                  this.setState({ description });
                }}
              />
              <TextField
                label="Prix du produit"
                value={this.state.price}
                onChangeText={price => {
                  this.setState({ price });
                }}
              />
              <TextField
                label="Taille"
                value={this.state.size}
                onChangeText={size => {
                  this.setState({ size });
                }}
              />
              <TextField
                label="Quantité"
                value={this.state.quantity}
                onChangeText={quantity => {
                  this.setState({ quantity });
                }}
              />
            </View>
            {this.buttonAddProduct()}

            <View style={styles.iconAdd}>
              <TouchableOpacity onPress={this.onShare}>
                <Icon name="share-alt" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  titleCate: {
    fontSize: 20,
  },
  input: {
    width: 300,
  },
  numberOfItem: {
    position: "absolute",
    left: 14,
    top: 14,
  },
  mainContainer: {
    alignItems: "center",
  },
  iconAdd: {
    backgroundColor: "#000",
    borderRadius: 50,
  },
});

export default ProductScreen;
