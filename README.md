<!-- Banner -->
<div align="center">

# 🔮 Orb Catcher

**Um jogo mobile de captura de orbes usando o giroscópio do celular**

[![Expo](https://img.shields.io/badge/Expo-v54.0.36-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 🎮 Sobre o Projeto

**Orb Catcher** é um jogo mobile desenvolvido com **React Native + Expo** que utiliza o **giroscópio físico do dispositivo** para controlar um jogador na tela. O objetivo é simples: **incline o celular** para mover a bola vermelha e capture o maior número possível de orbes ciano espalhados aleatoriamente pela tela!

> 📚 **Contexto acadêmico:** Projeto desenvolvido no 4° Semestre do curso de Desenvolvimento de Sistemas no **SENAI**, como parte da disciplina de React Native — explorando sensores nativos do dispositivo com a biblioteca `expo-sensors`.

---

## ✨ Funcionalidades

| Feature | Descrição |
|--------|-----------|
| 🕹️ **Controle por Giroscópio** | O jogador é controlado inclinando o celular — sem tocar na tela! |
| 🔵 **Orbe Aleatório** | O orbe ciano aparece em posições aleatórias a cada captura |
| 🏆 **Placar em Tempo Real** | Contador dourado que registra cada orbe capturado |
| 💥 **Detecção de Colisão** | Colisão circular precisa entre jogador e orbe |
| 🌙 **Interface Dark Mode** | Visual escuro com efeitos de brilho neon |
| 📱 **60 FPS** | Atualização do sensor a cada 16ms para movimento fluído |

---

## 🛠️ Tecnologias Utilizadas

```
📦 Stack Principal
├── ⚛️  React 19.1.0
├── 📱 React Native 0.81.5
├── 🧭 Expo SDK 54
├── 📡 expo-sensors (Gyroscope)
├── 🗂️  Expo Router (File-based routing)
└── 🔷 TypeScript 5.9
```

---

## 🧠 Como o Giroscópio Funciona

O giroscópio mede a **velocidade angular** do dispositivo nos eixos X, Y e Z (em rad/s).

```
        Z ↑
        |
        |_____ Y →
       /
      X
```

No jogo, fazemos um **mapeamento cruzado dos eixos**:

| Eixo do Giroscópio | Movimento na Tela | Motivo |
|--------------------|-------------------|--------|
| `data.y` (rotação lateral) | Move o jogador no **eixo X** (horizontal) | Inclinar para os lados |
| `data.x` (rotação frontal) | Move o jogador no **eixo Y** (vertical) | Inclinar para frente/trás |

```ts
// app/index.tsx
let newX = playerPosition.x - data.y * 10;  // inclinação lateral → movimento horizontal
let newY = playerPosition.y - data.x * 10;  // inclinação frontal → movimento vertical
```

---

## 🏗️ Arquitetura do Projeto

```
aula_giroscopio/
├── 📁 app/
│   └── index.tsx          # Tela principal do jogo (Game Loop)
│
├── 📁 components/
│   ├── TelaInicio.tsx      # Tela de início (em desenvolvimento)
│   ├── OrbeFlutuante.tsx   # Componente de bola flutuante (protótipo)
│   └── LeituraGiroscopio.tsx  # Leitura bruta dos dados do sensor
│
├── 📁 assets/              # Ícones, splash screen e fontes
├── app.json                # Configuração do Expo
├── package.json            # Dependências do projeto
└── tsconfig.json           # Configuração do TypeScript
```

### 📄 Principais Componentes

#### `app/index.tsx` — Motor do Jogo

Contém toda a lógica principal do jogo com **3 `useEffect`s encadeados**:

```
useEffect #1  →  Configura e assina o giroscópio (sensor listener)
useEffect #2  →  Atualiza a posição do jogador com base nos dados do sensor
useEffect #3  →  Verifica colisão entre o jogador e o orbe
```

#### `components/LeituraGiroscopio.tsx` — Debug do Sensor
Componente de apoio que exibe os valores brutos X, Y, Z do giroscópio em tempo real. Útil para calibrar e entender o comportamento do sensor.

#### `components/OrbeFlutuante.tsx` — Protótipo
Implementação isolada da física da bola flutuante, usada durante o desenvolvimento incremental da mecânica de movimento.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Expo Go](https://expo.dev/go) instalado no celular *(Android ou iOS)*
- npm ou yarn

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/JvictorMarcon/aula_giroscopio.git

# 2. Entre na pasta do projeto
cd aula_giroscopio

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm start
```

### Executando no dispositivo

```bash
# Android (via USB ou emulador)
npm run android

# iOS (via USB ou simulador — requer macOS)
npm run ios

# Navegador (funcionalidade do giroscópio limitada)
npm run web
```

> ⚠️ **Importante:** Para a experiência completa, execute no **dispositivo físico** via **Expo Go**. Emuladores geralmente não possuem giroscópio.

---

## 🎮 Como Jogar

```
1. 📲  Abra o Expo Go e escaneie o QR Code
2. 🕹️  Segure o celular na vertical (portrait)
3. 🔴  Você controla a bola VERMELHA
4. 🔵  Mire no orbe CIANO inclinando o celular
5. 🏆  Cada captura soma +1 ponto ao placar dourado
6. ♾️  Não há limite — bata seu próprio recorde!
```

---

## 🔧 Configurações do Jogo

Você pode ajustar estas constantes no arquivo [`app/index.tsx`](./app/index.tsx):

| Constante | Valor Padrão | Descrição |
|-----------|-------------|-----------|
| `PLAYER_SIZE` | `50` | Tamanho da bola do jogador (px) |
| `ORB_SIZE` | `30` | Tamanho do orbe a capturar (px) |
| `Gyroscope.setUpdateInterval(16)` | `16ms` | Taxa de atualização (~60 FPS) |
| `data.y * 10` | fator `10` | Sensibilidade do movimento horizontal |
| `data.x * 10` | fator `10` | Sensibilidade do movimento vertical |

---

## 📦 Dependências Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| `expo` | ~54.0.36 | Framework base |
| `expo-sensors` | ~15.0.8 | Acesso ao giroscópio |
| `expo-router` | ~6.0.24 | Roteamento baseado em arquivos |
| `react-native-reanimated` | ~4.1.1 | Animações performáticas |
| `react-native-gesture-handler` | ~2.28.0 | Gestos nativos |

---

## 🧑‍💻 Autor

<div align="center">

**João Victor Marcon**
4° Semestre — Desenvolvimento de Sistemas
**SENAI** · 2025

[![GitHub](https://img.shields.io/badge/GitHub-JvictorMarcon-181717?style=for-the-badge&logo=github)](https://github.com/JvictorMarcon)

</div>

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

Feito com 🔴 e muito 📱 por **João Victor Marcon**

*"Incline o celular. Capture o orbe. Repita."*

</div>
