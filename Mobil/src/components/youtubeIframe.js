import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

const YoutubeIframe = forwardRef((props, ref) => {
  const {
    videoId,
    play = false,
    mute = false,
    onError = () => {},
    onReady = () => {},
    onChangeState = () => {},
  } = props;

  const [playerReady, setPlayerReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef(null);

  useImperativeHandle(ref, () => ({
    seekTo: (seconds) => {
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`player.seekTo(${seconds}, true);`);
      }
    },
    playVideo: () => {
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`player.playVideo();`);
      }
    },
    pauseVideo: () => {
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`player.pauseVideo();`);
      }
    },
  }));

  const source = useMemo(() => {
    return {
      uri: `https://www.youtube.com/embed/${videoId}?autoplay=${
        play ? 1 : 0
      }&mute=${mute ? 1 : 0}&controls=1&enablejsapi=1`,
    };
  }, [videoId, play, mute]);

  const onWebMessage = useCallback(
    (event) => {
      try {
        const message = JSON.parse(event.nativeEvent.data);
        switch (message.eventType) {
          case "playerReady":
            setPlayerReady(true);
            setLoading(false);
            onReady();
            break;
          case "playerError":
            onError(message.data);
            break;
          case "playerStateChange":
            onChangeState(message.data);
            break;
          default:
            break;
        }
      } catch (error) {
        console.warn("[YoutubeIframe] Error:", error);
      }
    },
    [onReady, onError, onChangeState]
  );

  useEffect(() => {
    if (!playerReady) return;
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
          player.${play ? "playVideo" : "pauseVideo"}();
          player.${mute ? "mute" : "unMute"}();
        `);
    }
  }, [play, mute, playerReady]);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <WebView
        ref={webViewRef}
        style={styles.webView}
        source={source}
        allowsInlineMediaPlayback
        javaScriptEnabled
        onMessage={onWebMessage}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  webView: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default YoutubeIframe;
