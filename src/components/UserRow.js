import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import moment from "moment";

import styles from "../styles/UserRow.style";
import toggleBookmark from "../utils/toggleBookmark";

const BOOKMARK_IMAGE = require("../assets/icons/bookmark.png");
const BOOKMARKED_IMAGE = require("../assets/icons/bookmarked.png");
const DATE_FORMAT = "DD MMM YY";

class UserRow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isBookmarked: this.props.isBookmarked
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
    const bookmarkIcon = this.state.isBookmarked ? BOOKMARKED_IMAGE : BOOKMARK_IMAGE
    const date = moment(user.last_access_date * 1000);
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
            <Text style={styles.reputation}>Location: {user.location}</Text>
            <Text style={styles.reputation}>Last access date: {date.format(DATE_FORMAT)}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => this._toggleBookmark(user)}>
          <Image
            style={styles.bookmarkImage}
            source={bookmarkIcon}
          />
        </TouchableOpacity>

      </View >
    )
  }
}

export default UserRow;
