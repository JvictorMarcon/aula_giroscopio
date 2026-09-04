import { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Gyroscope } from "expo-sensors";
import TelaInicio from "@/components/TelaInicio"

const { width, height } = Dimensions.get("window");
const PLAYER_SIZE = 50;
const ORB_SIZE = 30;

// A função que gera a posição do orbe.
const generateRandomPosition = () => {
  const position = {
    x: Math.random() * (width - ORB_SIZE),
    y: Math.random() * (height - ORB_SIZE),
  };
  return position;
};

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [playerPosition, setPlayerPosition] = useState({
    x: width / 2,
    y: height / 2,
  });
  const [orbPosition, setOrbPosition] = useState(generateRandomPosition());
  const [placar, setPlacar] = useState<number>(0);
  const [gameOn, setGameOn] = useState<boolean>(false);

  if (!gameOn){
    return(
      <TelaInicio/>
    )
  }

  useEffect(() => {
    Gyroscope.setUpdateInterval(16);

    const subscription = Gyroscope.addListener((gyroscopeData) => {
      setData(gyroscopeData);
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    let newX = playerPosition.x - data.y * 10;
    let newY = playerPosition.y - data.x * 10;

    if (newX < 0) newX = 0;
    if (newX > width - PLAYER_SIZE) newX = width - PLAYER_SIZE;
    if (newY < 0) newY = 0;
    if (newY > height - PLAYER_SIZE) newY = height - PLAYER_SIZE;

    setPlayerPosition({ x: newX, y: newY });
  }, [data]);

  useEffect(() => {
    const playerCenterX = playerPosition.x + PLAYER_SIZE / 2;
    const playerCenterY = playerPosition.y + PLAYER_SIZE / 2;
    const orbCenterX = orbPosition.x + ORB_SIZE / 2;
    const orbCenterY = orbPosition.y + ORB_SIZE / 2;

    const dx = playerCenterX - orbCenterX;
    const dy = playerCenterY - orbCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < PLAYER_SIZE / 2 + ORB_SIZE / 2) {
      setOrbPosition(generateRandomPosition());
      setPlacar(placar + 1);
    }
  }, [playerPosition]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.instructions}>Colete o orbe azul!</Text>
        <View style={styles.placar}>
          <Text style={styles.placar_texto}>{placar}</Text>
        </View>
      </View>
      <View style={styles.gameArea}>
        <View
          style={[
            styles.orb,
            {
              left: orbPosition.x,
              top: orbPosition.y,
            },
          ]}
        />

        <View
          style={[
            styles.player,
            {
              left: playerPosition.x,
              top: playerPosition.y,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1a",
  },
  header: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  instructions: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backdropFilter: "blur(5px)",
  },
  placar: {
    height: 50,
    width: 80,
    backgroundColor: "#ffd700",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ffd700",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 2,
    borderColor: "#ffed4a",
    transform: [{ scale: 1 }],
  },
  placar_texto: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a2e",
    textShadowColor: "rgba(255,255,255,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  gameArea: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  player: {
    position: "absolute",
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    borderRadius: PLAYER_SIZE / 2,
    backgroundColor: "#ff6b6b",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#ff6b6b",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  orb: {
    position: "absolute",
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    backgroundColor: "#4ecdc4",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#4ecdc4",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
});