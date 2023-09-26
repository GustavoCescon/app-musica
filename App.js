import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { View } from "react-native";
import { useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import Player from "./Player";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreAllLogs(true);

  const [audioIndex, setAudioIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  const [musica, setMusica] = useState([
    {
      nome: "Sweet child of mine",
      artista: "Guns N Roses",
      playing: false,
      file: require("./audio.mp3"),
    },
    {
      nome: "Welcome to the jungle",
      artista: "Guns N Roses",
      playing: false,
      file: "",
    },
    {
      nome: "This love",
      artista: "Maroon 5",
      playing: false,
      file: {
        uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      },
    },
  ]);

  async function changeMusic(id) {
    let curFile = null;
    let newMusics = musica.filter((val, k) => {
      if (id == k) {
        musica[k].playing = true;
        curFile = musica[k].file;
        setPlaying(true);
        setAudioIndex(id);
      } else {
        musica[k].playing = false;
      }
      return musica[k];
    });
    if (audio != null) {
      audio.unloadAsync();
    }
    let curAudio = new Audio.Sound();
    try {
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    } catch (error) {}
    setAudio(curAudio);
    setMusica(newMusics);
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <StatusBar hidden />
        <View style={styles.header}>
          <Text style={{ textAlign: "center", color: "#fff", fontSize: 25 }}>
            App música
          </Text>
        </View>

        <View style={styles.table}>
          <Text style={{ width: "50%", color: "rgb(200,200,200)" }}>
            Música
          </Text>
          <Text style={{ width: "50%", color: "rgb(200,200,200)" }}>
            Artista
          </Text>
        </View>

        {musica.map((val, k) => {
          if (val.playing === true) {
            return (
              <View style={styles.table}>
                <TouchableOpacity
                  onPress={() => changeMusic(k)}
                  style={{ width: "100%", flexDirection: "row" }}
                >
                  <Text
                    style={{
                      width: "50%",
                      color: "#1DB954",
                    }}
                  >
                    <AntDesign name="play" size={15} color="#1DB954" />
                    {val.nome}
                  </Text>
                  <Text style={{ width: "50%", color: "#1DB954" }}>
                    {val.artista}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <View style={styles.table}>
                <TouchableOpacity
                  onPress={() => changeMusic(k)}
                  style={{ width: "100%", flexDirection: "row" }}
                >
                  <Text style={{ width: "50%", color: "white" }}>
                    <AntDesign name="play" size={15} color="#fff" />
                    {val.nome}
                  </Text>
                  <Text style={{ width: "50%", color: "white" }}>
                    {val.artista}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
        })}
        <View style={{ paddingBottom: 200 }}></View>
      </ScrollView>
      <Player
        playing={playing}
        setPlaying={setPlaying}
        audioIndex={audioIndex}
        musica={musica}
        setMusica={setMusica}
        audio={audio}
        setAudio={setAudio}
        setAudioIndex={setAudioIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  header: {
    backgroundColor: "#1DB954",
    width: "100%",
    padding: 20,
  },
  table: {
    flexDirection: "row",
    padding: 20,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
});
