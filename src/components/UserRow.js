import React from "react";
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from "react-native";

import styles from "../styles/UserRow.style";
import toggleBookmark from "../utils/toggleBookmark";
import isBookmarked from "../utils/isBookmarked";

const BOOKMARK_IMAGE = "../assets/icons/bookmark.png";
const BOOKMARKED_IMAGE = "../assets/icons/bookmarked.png";

class UserRow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isBookmarked: isBookmarked(this.props.user.account_id)
    }
  }

  _toggleBookmark(user) {
    toggleBookmark(user);
    this.setState({
      isBookmarked: !this.state.isBookmarked
    })
  }

  render() {
    const user = this.props.user;

    const bookmarkIcon = this.state.isBookmarked ? require(BOOKMARKED_IMAGE) : require(BOOKMARK_IMAGE)

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
        <TouchableWithoutFeedback onPress={() => this._toggleBookmark(user)}>
          <Image
            style={styles.bookmarkImage}
            source={bookmarkIcon}
          />
        </TouchableWithoutFeedback>
      </View >
    )
  }
}

export default UserRow;
