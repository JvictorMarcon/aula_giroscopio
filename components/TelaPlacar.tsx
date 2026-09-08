import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function TelaPlacar({ placar, setShowPlacar, setGameOn }) {
  const voltarInicio = () => {
    setShowPlacar(false);
    setGameOn(false);
  };
  const voltarGame = () =>{
    setShowPlacar(false)
    setGameOn(true)
  }
  // Função para determinar a mensagem baseada na pontuação
  const getMensagem = () => {
    if (placar >= 20) return "Excelente! Você é um mestre!";
    if (placar >= 10) return "Muito bom! Continue assim!";
    if (placar > 0) return "Bom trabalho! Tente melhorar!";
    return "Não desista! Tente novamente!";
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Fim de Jogo!</Text>
        
        <View style={styles.placarContainer}>
          <Text style={styles.placarLabel}>Sua Pontuação</Text>
          <Text style={styles.placarValor}>{placar}</Text>
        </View>
        
        <Text style={styles.mensagem}>{getMensagem()}</Text>
        
        <TouchableOpacity style={styles.button} onPress={voltarGame}>
          <Text style={styles.buttonText}>Jogar Novamente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={voltarInicio}>
            <Text>Voltar ao inicio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0f1a",
    padding: 20,
  },
  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: 30,
    padding: 40,
    alignItems: "center",
    width: "100%",
    maxWidth: 350,
    borderWidth: 1,
    borderColor: "#333",
    shadowColor: "#4ecdc4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  placarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  placarLabel: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 5,
  },
  placarValor: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#ffd700",
    textShadowColor: "#ffd700",
    textShadowOffset: { width: 0, height: 0 },
    textShadowOpacity: 0.3,
    textShadowRadius: 20,
  },
  mensagem: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#4ecdc4",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    shadowColor: "#4ecdc4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 5,
  },
  buttonText: {
    color: "#1a1a2e",
    fontSize: 20,
    fontWeight: "bold",
  },
});