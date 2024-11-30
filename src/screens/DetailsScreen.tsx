import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { addSong } from "../redux/recentlyPlayedSlice";
import { Ionicons } from "@expo/vector-icons";
import theme from "../utils/theme";

const DetailsScreen = ({ route, navigation }: any) => {
  const { song } = route.params;
  const dispatch = useDispatch();

  const handlePlaySong = () => {
    dispatch(addSong(song)); 
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBBC05" />
      
      
      <View style={styles.headerContainer}>
       
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={15} color="white" />
        </TouchableOpacity>

      
        <Text style={styles.songTitle}>{song.trackName}</Text>
      </View>

    
      <View style={styles.artworkMetaContainer}>
        <Image
          source={{ uri: song.artworkUrl100 }}
          style={styles.artwork}
        />
        <View style={styles.metaInfo}>
          <Text style={styles.metaText}>
            <Text style={styles.metaLabel}>Genre: </Text>
            {song.primaryGenreName || "N/A"}
          </Text>
          <Text style={styles.metaText}>
            <Text style={styles.metaLabel}>Country: </Text>
            {song.country || "N/A"}
          </Text>
        </View>
        <TouchableOpacity style={styles.playButton} onPress={handlePlaySong}>
          <Ionicons name="play" size={20} color="white" />
        </TouchableOpacity>
      </View>

     
      <ScrollView contentContainerStyle={styles.detailsContainer}>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Artist Name: </Text>
          {song.artistName}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Collection Name: </Text>
          {song.collectionName}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Track Price: </Text>
          {song.trackPrice ? `$${song.trackPrice}` : "N/A"}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Release Date: </Text>
          {new Date(song.releaseDate).toLocaleDateString() || "N/A"}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Description: </Text>
          {song.longDescription || "No description available."}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    backgroundColor: theme.colors.brand,
    borderBottomRightRadius: 180,
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight || 40,
    paddingBottom: 140,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: StatusBar.currentHeight || 20,
    left: 20,
    width: 30,
    height: 30,
    backgroundColor: theme.colors.background,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  songTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    marginTop: 50,
    textAlign: "left",
  },
  artworkMetaContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: -120,
    paddingHorizontal: 20,
  },
  artwork: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: theme.colors.textPrimary,
    zIndex: 1,
  },
  metaInfo: {
    marginLeft: 20,
    justifyContent: "space-between",
    height: 40,
  },
  metaText: {
    fontSize: 10,
    color: theme.colors.textPrimary,
  },
  metaLabel: {
    fontWeight: "bold",
    color: theme.colors.background,
  },
  playButton: {
    position: "absolute",
    left: 200,
    top: 95,
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: theme.colors.brand,
    zIndex: 2,
  },
  detailsContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  detailText: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
});


export default DetailsScreen;
