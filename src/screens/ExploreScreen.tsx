import React, { useEffect } from "react";
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
import theme from "../utils/theme";

const ExploreScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { songs, loading, query, page } = useSelector((state: any) => state.songs);

  useEffect(() => {
    dispatch(getSongs({ query, page }));
  }, [query, page, dispatch]);

  const handleSearch = (text: string) => {
    dispatch(setQuery(text));
  };

  const handleClearSearch = () => {
    dispatch(setQuery(""));
  };

  const handleLoadMore = () => {
    dispatch(loadMore());
  };

  const handleSongPress = (song: Song) => {
    navigation.navigate("Details", { song });
  };

  const renderSong = ({ item }: { item: Song }) => (
    <TouchableOpacity style={styles.songItem} onPress={() => handleSongPress(item)}>
      <Image
        source={{ uri: item.artworkUrl100 || "https://via.placeholder.com/100" }}
        style={styles.thumbnail}
      />
      <View style={styles.songDetails}>
        <Text style={styles.trackName}>{item.trackName || "Unknown"}</Text>
        <Text style={styles.artistName}>
          {item.artistName || "Unknown"} • {item.collectionName || "Unknown"}
        </Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreIcon}>•••</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
     
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search songs, artists, albums..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={handleSearch}
        />
        {query.length > 0 && (
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
          keyExtractor={(item) => item.trackId?.toString() || Math.random().toString()}
          renderItem={renderSong}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
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
