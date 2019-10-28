//Display each record of reputation for a user
import React from "react";
import {
  Text,
  View
} from "react-native";
import moment from "moment";

import styles from "../styles/HistoryRow.style";
const DATE_FORMAT = "DD MMM YY";

class UserRow extends React.Component {

  render() {
    const item = this.props.item;
    const date = moment(item.creation_date * 1000);
    return (

      <View style={styles.container}>
        <Text>Reputation type: {item.reputation_history_type}</Text>
        <Text>Change: {item.reputation_change}</Text>
        <Text>Created at: {date.format(DATE_FORMAT)}</Text>
        <Text>Post ID: {item.post_id}</Text>
      </View >

    )
  }
}

export default UserRow;
