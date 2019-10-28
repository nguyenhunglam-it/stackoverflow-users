import React from "react";
import {
  View,
  FlatList,
  Switch,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

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
      fullList: [],
      isBookmarkedOnly: false,
      isLoading: true
    }
  }

  async componentDidMount() {
    const bookmarked = await getBookmarkedFromStorage();
    store.dispatch({ type: INITIALIZE_BOOKMARK, payload: bookmarked });
    const userList = await getUserList(1);
    if (!userList)
      this.setState({
        isLoading: false,
        isError: true
      })
    else {
      const fullList = userList.items;
      this.setState({
        fullList,
        isLoading: false
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.isBookmarkedOnly != nextState.isBookmarkedOnly ||
      this.state.isLoading != nextState.isLoading ||
      JSON.stringify(this.props.bookmarked) != JSON.stringify(nextProps.bookmarked)
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

    const bookmarked = Object.assign({}, this.props.bookmarked)
    return (

      <FlatList
        data={displayList}
        keyExtractor={item => item.account_id.toString()}
        extraData={bookmarked}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.props.navigation.navigate("History", {
            user: item,
          })
          }
          >
            <UserRow user={item} />
          </TouchableOpacity>
        )}
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