import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Song } from "../types/Song";
import theme from "../utils/theme";

const SongItem = ({ item, onPress }: { item: Song; onPress: (song: Song) => void }) => (
  <TouchableOpacity style={styles.songItem} onPress={() => onPress(item)}>
    <Image source={{ uri: item.artworkUrl100 || "https://via.placeholder.com/100" }} style={styles.thumbnail} />
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

const styles = StyleSheet.create({
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

export default SongItem;
