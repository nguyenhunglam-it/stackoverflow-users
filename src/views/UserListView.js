import React from "react";
import {
  View,
  FlatList,
  Switch,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

import store from "../store";
import { INITIALIZE_BOOKMARK } from "../actions/types";
import styles from "../styles/UserListView.style";
import getUserList from "../utils/getUserList";
import getBookmarkedFromStorage from "../utils/getBookmarkedFromStorage";
import UserRow from "../components/UserRow";
import InformationText from "../components/InformationText";

const LOADING_TEXT = "Loading users...";
const ERROR_TEXT = "Network error or API does not available";

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
    if (!userList || userList.error_id)
      this.setState({
        isLoading: false,
        isError: true
      })
    else {
      const fullList = userList.items;
      this.setState((prevState) => ({
        fullList: [...prevState.fullList, ...fullList],
        isLoading: false
      }));
    }
  }

  loadMore() {
    if (this.state.isBookmarkedOnly) return
    this.setState((prevState) => ({
      page: prevState.page + 1,
      loadingMore: true
    }),
      () => {
        this.fetchUser();
      }
    );
  }

  renderFooter() {
    if (!this.state.loadingMore || this.state.isBookmarkedOnly) return null;
    return (
      <View style={styles.loadingMoreView}>
        <Text style={styles.loadingMoreText}>Loading more...</Text>
      </View>
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
      this.state.fullList.length != nextState.fullList.length ||
      this.props.bookmarked != nextProps.bookmarked
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

    return (

      <FlatList
        data={displayList}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: 100
        }}
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
        ListFooterComponent={() => this.renderFooter()}
      />

    )
  }

  render() {
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

const mapStateToProps = (state) => {
  return {
    bookmarked: state.bookmarked
  }
}

export default connect(mapStateToProps)(UserListView);