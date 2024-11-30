import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSongs, setQuery, loadMore } from "../redux/songsSlice";
import { Song } from "../types/Song";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SongItem from "../components/SongItem";
import theme from "../utils/theme";
import { useDebounce } from "../hooks/useDebounce";

const ExploreScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { songs, loading, query, page } = useSelector((state: any) => state.songs);
  const [searchTerm, setSearchTerm] = useState(query);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(setQuery(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  useEffect(() => {
    const searchQuery = query.trim() || "all";
    dispatch(getSongs({ query: searchQuery, page }));
  }, [query, page, dispatch]);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    dispatch(setQuery(""));
    dispatch(getSongs({ query: "all", page: 1 }));
  };
  

  const handleLoadMore = () => {
    dispatch(loadMore());
  };

  const handleSongPress = (song: Song) => {
    navigation.navigate("Details", { song });
  };

  const renderItem = useCallback(
    ({ item }) => <SongItem item={item} onPress={handleSongPress} />,
    [handleSongPress]
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search songs, artists, albums..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item, index) => {
            const key = item.trackId?.toString() || `${item.wrapperType}-${item.collectionId || item.artistId}-${index}`;
            return `${key}-${index}`;
          }}                         
          //renderItem={({ item }) => <SongItem item={item} onPress={handleSongPress} />}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews={true}
          ListFooterComponent={
            loading ? <ActivityIndicator size="small" color="#FFD700" /> : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.textInputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.loginLabels,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
    color: theme.colors.textSecondary,
  },
  searchBar: {
    flex: 1,
    color: theme.colors.textPrimary,
    paddingVertical: 12,
  },
  clearButton: {
    marginLeft: 8,
  },
  clearButtonText: {
    color: theme.colors.brand,
    fontWeight: "bold",
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: theme.colors.textInputBackground,
    borderRadius: 8,
    marginBottom: 16,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  songDetails: {
    flex: 1,
  },
  trackName: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  artistName: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  moreButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  moreIcon: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ExploreScreen;
