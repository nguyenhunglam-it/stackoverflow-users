import React from "react";
import {
  Text,
  View,
  FlatList
} from "react-native";

import styles from "../styles/ReputationHistoryView.style";
import getReputationHistory from "../utils/getReputationHistory";
import UserRow from "../components/UserRow";
import HistoryRow from "../components/HistoryRow";
import InformationText from "../components/InformationText";

const LOADING_TEXT = "Loading information...";
const ERROR_TEXT = "Network error or API does not available";

class ReputationHistoryView extends React.Component {
  constructor(props) {
    super(props)
    this.user = this.props.navigation.getParam("user")
    this.state = {
      isLoading: true,
      hasMore: true,
      loadingMore: false,
      page: 1,
      history: []
    }
  }

  async fetchHistory() {
    const historyFromAPI = await getReputationHistory(this.user.account_id, this.state.page);
    if (!!historyFromAPI)
      this.setState((prevState) => ({
        hasMore: historyFromAPI.has_more,
        history: [...prevState.history, ...historyFromAPI.items],
        isLoading: false
      }))
    else
      this.setState({
        isLoading: false,
        isError: true
      })
  }

  loadMore() {
    if (!this.state.hasMore) return
    this.setState((prevState) => ({
      page: prevState.page + 1,
      loadingMore: true
    }),
      () => {
        this.fetchHistory();
      }
    );
  }

  renderFooter() {
    if (!this.state.loadingMore) return null;
    return (
      <View style={styles.loadingMoreView}>
        <Text style={styles.loadingMoreText}>Loading more...</Text>
      </View>
    );
  }

  async componentDidMount() {
    this.fetchHistory();
  }

  listRender() {
    if (!!this.state.history.length)
      return (
        <FlatList
          data={this.state.history}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 90 }}
          renderItem={({ item }) => (
            <HistoryRow item={item} />
          )}
          onEndReached={() => this.loadMore()}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          ListFooterComponent={() => this.renderFooter()}
        />
      )
    else return (
      <View style={styles.loadingContainer}>
        <Text style={styles.centerText}>No information available.</Text>
      </View>
    )
  }

  render() {
    const isBookmarked = this.props.navigation.getParam("isBookmarked")
    return (

      <View>

        <View style={styles.header}>
          <UserRow user={this.user} isBookmarked={isBookmarked} />
        </View>
        {this.state.isLoading ?
          <InformationText text={LOADING_TEXT} />
          :
          this.state.isError ?
            <InformationText text={ERROR_TEXT} />
            :
            this.listRender()
        }

      </View>

    )
  }
}

export default ReputationHistoryView