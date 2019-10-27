import React from "react";
import {
  Text,
  View,
  Image
} from "react-native";
import styles from "../styles/UserRow.style"

class UserRow extends React.Component {
  render() {
    const user = this.props.user
    return (
      <View style={styles.container}>
        <View style={styles.userSection}>
          <Image
            style={styles.profileImage}
            source={{ uri: user.profile_image }}
          />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{user.display_name}</Text>
            <Text style={styles.reputation}>Reputation: {user.reputation}</Text>
          </View>
        </View>
        <Image
          style={styles.bookmarkImage}
          source={require("../assets/icons/bookmark.png")}
        />
      </View >
    )
  }
}

export default UserRow;
