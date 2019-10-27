import AsyncStorage from '@react-native-community/async-storage';

export default async function getBookmarkedFromStorage() {
  const bookmarked = await AsyncStorage.getItem("bookmarked");
  return bookmarked ? JSON.parse(bookmarked) : {};
} 