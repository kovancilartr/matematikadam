import React, { useCallback, useState, useEffect } from "react";
import { View, Text } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";

interface VideoPlayerProps {
  videoUrl: string;
}

const MeVideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const extractVideoId = (url: string): string => {
      const match = url.match(
        /(?:\?v=|\/embed\/|\/v\/|youtu\.be\/|\/watch\?v=|&v=)([^#&?]*).*/
      );
      return match && match[1].length === 11 ? match[1] : "";
    };
    const id = extractVideoId(videoUrl);
    setVideoId(id);
  }, [videoUrl]);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View style={{ width: "100%", height: 200, marginTop: 16 }}>
      {videoId ? (
        <YoutubeIframe
          height={210} // Videonun yüksekliği
          webViewStyle={{ borderRadius: 6 }} // Video stilinde yuvarlatılmış köşe
          videoId={videoId} // YouTube video ID
          play={playing} // Videonun oynatılma durumu
          mute={false} // Sessiz modu kapalı
          onReady={() => console.log("Player hazır!")}
          onError={(err) => console.error("Hata:", err)}
          onChangeState={onStateChange} // Durum değişikliklerini işleme
        />
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Video yükleniyor...</Text>
        </View>
      )}
    </View>
  );
};

export default MeVideoPlayer;
