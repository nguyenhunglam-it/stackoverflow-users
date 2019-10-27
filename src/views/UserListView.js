import React from "react";
import {
  Text,
  View,
  FlatList,
  Image
} from "react-native";
import getUserList from "../utils/getUserList";

class UserListView extends React.Component {
  render() {
    const userList = getUserList();
    return (
      <View>
        <FlatList
          data={userList.items}
          keyExtractor={item => item.account_id}
          renderItem={({ item }) => (
            <View>
              <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: item.profile_image }}
              />
              <Text>{item.display_name}</Text>
            </View>
          )}
        />
      </View>
    )
  }
}

export default UserListView;