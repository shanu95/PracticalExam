import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/authSlice";
import { addSong } from "../redux/recentlyPlayedSlice";
import theme from "../utils/theme";
import * as SecureStore from "expo-secure-store";

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

 
  const recentlyPlayed = useSelector((state: any) => state.recentlyPlayed.songs);

  //dummy recently played
  useEffect(() => {
    const dummyData = [
      {
        trackId: "1",
        trackName: "September 16",
        artistName: "Russ",
        artworkUrl100: "https://via.placeholder.com/200x200?text=September+16",
        trackPrice: 1.99,
        releaseDate: "2023-01-01",
        collectionName: "Dummy Collection",
      },
      {
        trackId: "2",
        trackName: "Feel the Summer",
        artistName: "Various Artists",
        artworkUrl100: "https://via.placeholder.com/200x200?text=Feel+the+Summer",
        trackPrice: 1.49,
        releaseDate: "2023-01-01",
        collectionName: "Dummy Collection",
      },
      {
        trackId: "3",
        trackName: "Shake the Snow Globe",
        artistName: "Russ",
        artworkUrl100:
          "https://via.placeholder.com/200x200?text=Shake+the+Snow+Globe",
        trackPrice: 0.99,
        releaseDate: "2023-01-01",
        collectionName: "Dummy Collection",
      },
    ];

    dummyData.forEach((song) => {
      dispatch(addSong(song));
    });
  }, [dispatch]);

  const [modalVisible, setModalVisible] = React.useState(false);

  const handleLogout = async () => {
    setModalVisible(false);
  
    try {
      //remove saved token when logging out
      await SecureStore.deleteItemAsync("userToken");
      
      
      dispatch(setToken(null));
  
      
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error clearing secure storage on logout:", error);
    }
  };
  

  const renderHorizontalList = () => {
    return (
      <FlatList
        data={recentlyPlayed.slice(1)}
        keyExtractor={(item) => item.trackId}
        renderItem={({ item }) => (
          <View style={styles.songItem}>
            <Image source={{ uri: item.artworkUrl100 }} style={styles.artworkSmall} />
            <View style={styles.songDetails}>
              <Text style={styles.trackName}>{item.trackName}</Text>
              <Text style={styles.artistName}>{item.artistName}</Text>
            </View>
          </View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    );
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Afternoon</Text>
          <Text style={styles.subText}>Recently played</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={{
              uri: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
            }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

     
      {recentlyPlayed.length > 0 && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { song: recentlyPlayed[0] })
          }
        >
          <View style={styles.lastPlayedContainer}>
            <Image
              source={{ uri: recentlyPlayed[0].artworkUrl100 }}
              style={styles.artworkLarge}
            />
            <View style={styles.lastPlayedDetails}>
              <Text style={styles.lastPlayedTrack}>{recentlyPlayed[0].trackName}</Text>
              <Text style={styles.lastPlayedArtist}>
                {recentlyPlayed[0].artistName}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

     
      {recentlyPlayed.length > 1 && renderHorizontalList()}

     
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Logging Out</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to log out?
            </Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: "bold",
  },
  subText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.loginLabels,
  },
  lastPlayedContainer: {
    marginBottom: 20,
  },
  artworkLarge: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  lastPlayedDetails: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderRadius: 8,
  },
  lastPlayedTrack: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  lastPlayedArtist: {
    color: theme.colors.brand,
    fontSize: 14,
  },
  horizontalList: {
    marginTop: 10,
  },
  songItem: {
    alignItems: "center",
    marginRight: 10,
  },
  artworkSmall: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  songDetails: {
    alignItems: "center",
    marginTop: 5,
  },
  trackName: {
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  artistName: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: theme.colors.background,
    textAlign: "center",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: theme.colors.brand,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  logoutButtonText: {
    fontWeight: "bold",
    color: theme.colors.background,
  },
});

export default HomeScreen;
