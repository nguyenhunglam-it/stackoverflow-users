import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    alignItems: "center",
  },

  userSection: {
    flexDirection: "row",
    flex: 8
  },

  userInfo: {
    marginLeft: 5,
  },

  profileImage: {
    height: 75,
    width: 75
  },

  username: {
    fontSize: 20
  },

  reputation: {

  },

  bookmarkImage: {
    height: 50,
    width: 50,
    marginRight: 10
  }

});