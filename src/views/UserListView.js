import React from "react";
import {
  View,
  FlatList,
} from "react-native";

import getUserList from "../utils/getUserList";
import UserRow from "../components/UserRow";

class UserListView extends React.Component {
  render() {

    const userList = getUserList();

    return (

      <View>
        <FlatList
          data={userList.items}
          keyExtractor={item => item.account_id.toString()}
          renderItem={({ item }) => (
            <UserRow user={item} />
          )}
        />
      </View>

    )

  }
}

export default UserListView;