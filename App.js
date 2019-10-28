import React from "react";
import { Provider } from "react-redux";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import UserListView from "./src/views/UserListView";
import ReputationHistoryView from "./src/views/ReputationHistoryView"
import store from './src/store';


class UserListScreen extends React.Component {
  static navigationOptions = {
    title: "Stack Overflow Users",
  };
  render() {
    return <UserListView navigation={this.props.navigation} />
  }
}

class UserReputationHistoryScreen extends React.Component {
  static navigationOptions = {
    title: "User Reputation",
  };
  render() {
    return <ReputationHistoryView navigation={this.props.navigation} />
  }
}

const RootNavigationStack = createStackNavigator(
  {
    List: UserListScreen,
    History: UserReputationHistoryScreen,
  },
  {
    initialRouteName: 'List',
  }
);

const AppContainer = createAppContainer(RootNavigationStack);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

export default App;
