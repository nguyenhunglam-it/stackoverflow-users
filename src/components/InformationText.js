import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/InformationText.style";

export default class InformationText extends React.Component {
  render() {
    const text = this.props.text;
    return (
      <View style={styles.loadingContainer} >
        <Text style={styles.centerText}>{text}</Text>
      </View >
    )
  }
}