import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SongItem = ({ artist, track, artwork }: any) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: artwork }} style={styles.artwork} />
      <Text style={styles.trackName}>{track}</Text>
      <Text style={styles.artistName}>{artist}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginRight: 10,
  },
  artwork: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  trackName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  artistName: {
    color: "#999",
    fontSize: 12,
  },
});

export default SongItem;
