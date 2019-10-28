import React from "react";
import {
  View,
  FlatList,
  Switch,
  Text,
  TouchableOpacity
} from "react-native";

import getUserList from "../utils/getUserList";
import UserRow from "../components/UserRow";
import getBookmarkedFromStorage from "../utils/getBookmarkedFromStorage";
import store from "../store";
import { INITIALIZE_BOOKMARK } from "../actions/types";
import styles from "../styles/UserListView.style";
import InformationText from "../components/InformationText";

const LOADING_TEXT = "Loading users...";
const ERROR_TEXT = "Network error!";

class UserListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      fullList: [],
      isBookmarkedOnly: false,
      isLoading: true,
      loadingMore: false
    }
  }

  async fetchUser() {
    const userList = await getUserList(this.state.page);
    if (!userList)
      this.setState({
        isLoading: false,
        isError: true
      })
    else {
      const fullList = userList.items;
      this.setState((prevState) => ({
        fullList: [...prevState.fullList, ...fullList],
        isLoading: false
      }), () => {
        console.log(this.state.fullList.length)
      });
    }
  }

  loadMore() {
    this.setState((prevState) => ({
      page: prevState.page + 1,
      loadingMore: true
    }),
      () => {
        console.log("22")
        this.fetchUser();
      }
    );
  }

  async componentDidMount() {
    const bookmarked = await getBookmarkedFromStorage();
    store.dispatch({ type: INITIALIZE_BOOKMARK, payload: bookmarked });
    this.fetchUser()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.isBookmarkedOnly != nextState.isBookmarkedOnly ||
      this.state.isLoading != nextState.isLoading ||
      this.state.loadingMore != nextState.loadingMore ||
      this.state.fullList.length != nextState.fullList.length
    )
  }

  toggleBookmarkedOnly(value) {
    this.setState({
      isBookmarkedOnly: value,
    })
  }

  renderList() {

    let displayList = []
    if (this.state.isBookmarkedOnly) {
      const bookmarked = store.getState().bookmarked;
      displayList = Object.keys(bookmarked).map((id) => {
        return {
          display_name: bookmarked[id].display_name,
          profile_image: bookmarked[id].profile_image,
          reputation: bookmarked[id].reputation,
          location: bookmarked[id].location,
          last_access_date: bookmarked[id].last_access_date,
          account_id: id
        }
      })
    }
    else displayList = this.state.fullList
    console.log(displayList.length)

    return (

      <FlatList
        data={displayList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.props.navigation.navigate("History", {
            user: item,
          })
          }
          >
            <UserRow user={item} />
          </TouchableOpacity>
        )}
        onEndReached={() => this.loadMore()}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
      />

    )
  }

  render() {
    console.log("render")
    return (
      <View>

        <View style={styles.header}>
          <Text style={styles.headerSmallText}>Bookmarked only</Text>
          <Switch
            value={this.state.isBookmarkedOnly}
            onValueChange={value => this.toggleBookmarkedOnly(value)}
          />
        </View>
        {
          this.state.isLoading ?
            <InformationText text={LOADING_TEXT} />
            :
            this.state.isError ?
              <InformationText text={ERROR_TEXT} />
              :
              this.renderList()
        }

      </View>
    )
  }
}

export default UserListView;