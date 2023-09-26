import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

export default function Player(props) {
  const handlePlay = async () => {
    let curFile = props.musica[props.audioIndex].file;

    let newMusics = props.musica.filter((val, k) => {
      if (props.audioIndex == k) {
        props.musica[k].playing = true;
        curFile = props.musica[k].file;
      } else {
        props.musica[k].playing = false;
      }
      return props.musica[k];
    });

    try {
      if (props.audio != null) {
        props.setPlaying(true);
        props.setMusica(newMusics);
        await props.audio.playAsync();
      } else {
        let curAudio = new Audio.Sound();
        try {
          await curAudio.loadAsync(curFile);
          await curAudio.playAsync();
        } catch (error) {}
        props.setAudio(curAudio);
        props.setMusica(newMusics);
        props.setPlaying(true);
      }
    } catch (error) {}
  };

  const handlePause = async () => {
    if (props.audio != null) {
      props.audio.pauseAsync();
    }
    props.setPlaying(false);
  };

  const handleNext = async () => {
    let newIndex = props.audioIndex + 1;
    if (newIndex >= props.musica.length) {
      newIndex = 0;
    }
    props.setAudioIndex(newIndex);

    let curFile = props.musica[newIndex].file;
    let newMusics = props.musica.filter((val, k) => {
      if (newIndex == k) {
        props.musica[k].playing = true;
        curFile = props.musica[k].file;
      } else {
        props.musica[k].playing = false;
      }
      return props.musica[k];
    });

    if (props.audio != null) {
      props.audio.unloadAsync();
    }
    let curAudio = new Audio.Sound();
    try {
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    } catch (error) {}
    props.setAudio(curAudio);
    props.setMusica(newMusics);
    props.setPlaying(true);
  };
  const handleBack = async () => {
    let newIndex = props.audioIndex - 1;
    if (newIndex < 0) {
      newIndex = props.musica.length - 1;
    }
    props.setAudioIndex(newIndex);

    let curFile = props.musica[newIndex].file;
    let newMusics = props.musica.filter((val, k) => {
      if (newIndex == k) {
        props.musica[k].playing = true;
        curFile = props.musica[k].file;
      } else {
        props.musica[k].playing = false;
      }
      return props.musica[k];
    });

    if (props.audio != null) {
      props.audio.unloadAsync();
    }
    let curAudio = new Audio.Sound();
    try {
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    } catch (error) {}
    props.setAudio(curAudio);
    props.setMusica(newMusics);
    props.setPlaying(true);
  };

  return (
    <View style={styles.player}>
      <TouchableOpacity
        onPress={() => handleBack()}
        style={{ marginRight: 20, marginLeft: 20 }}
      >
        <AntDesign name="banckward" size={35} color="white" />
      </TouchableOpacity>

      {!props.playing ? (
        <TouchableOpacity
          onPress={() => handlePlay()}
          style={{ marginRight: 20, marginLeft: 20 }}
        >
          <AntDesign name="playcircleo" size={35} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => handlePause()}
          style={{ marginRight: 20, marginLeft: 20 }}
        >
          <AntDesign name="pausecircle" size={35} color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => handleNext()}
        style={{ marginRight: 20, marginLeft: 20 }}
      >
        <AntDesign name="forward" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
