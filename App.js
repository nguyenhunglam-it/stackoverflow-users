import React from 'react';
import { Provider } from 'react-redux';

import UserListView from "./src/views/UserListView";
import store from './src/store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <UserListView />
      </Provider>
    )
  }
}

export default App;
