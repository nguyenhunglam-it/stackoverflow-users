import React from "react";
import {
  View,
  FlatList,
  Switch,
  Text
} from "react-native";
import { connect } from "react-redux";

import getUserList from "../utils/getUserList";
import UserRow from "../components/UserRow";
import getBookmarkedFromStorage from "../utils/getBookmarkedFromStorage";
import store from "../store";
import { INITIALIZE_BOOKMARK } from "../actions/types";
import styles from "../styles/UserListView.style"

class UserListView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullList: [],
      isBookmarkedOnly: false,
      isLoading: true
    }
  }

  async componentDidMount() {
    const bookmarked = await getBookmarkedFromStorage();
    store.dispatch({ type: INITIALIZE_BOOKMARK, payload: bookmarked });
    const fullList = getUserList().items;
    this.setState({
      fullList,
      isLoading: false
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.isBookmarkedOnly != nextState.isBookmarkedOnly ||
      this.state.isLoading != nextState.isLoading ||
      this.props.bookmarked != nextProps.bookmarked
    )
  }

  toggleBookmarkedOnly(value) {
    this.setState({
      isBookmarkedOnly: value,
    })
  }

  render() {
    if (this.state.isLoading) return (<View></View>);

    let displayList = []
    if (this.state.isBookmarkedOnly) {
      const bookmarked = this.props.bookmarked;
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

      <View>
        <View style={styles.header}>
          <Text style={styles.headerSmallText}>Bookmarked only</Text>
          <Switch
            value={this.state.isBookmarkedOnly}
            onValueChange={value => this.toggleBookmarkedOnly(value)}
          />
        </View>
        <FlatList
          data={displayList}
          keyExtractor={item => item.account_id.toString()}
          renderItem={({ item }) => (
            <UserRow user={item} isBookmarked={this.props.bookmarked[item.account_id]} />
          )}
        />
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