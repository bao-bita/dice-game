<template>
  <div class="wrapper clearfix">
    <players
      :player="player"
      :currScorePlayer1="currScorePlayer1"
      :currScorePlayer2="currScorePlayer2"
      :scorePlayer1="scorePlayer1"
      :scorePlayer2="scorePlayer2"
      :winner="winner"
    />
    <controls
      :isPlaying="isPlaying"
      :finalScore="finalScore"
      @newGame="newGame"
      @rollDice="rollDice"
      @hold="hold"
      @changeFinalScore="handleChangeFinalScore"
      v-bind:inputFocus="inputFocus"
    />
    <dice :dice1="dice1" :dice2="dice2" />
  </div>
</template>

<script>
import Players from './components/Players';
import Controls from './components/Controls';
import Dice from './components/Dice';
export default {
  name: 'app',
  components: {
    Players,
    Controls,
    Dice
  },
  data() {
    return {
      isPlaying: false,
      finalScore: 20,
      player: 1,
      dice1: null,
      dice2: null,
      currScorePlayer1: 0,
      currScorePlayer2: 0,
      scorePlayer1: 0,
      scorePlayer2: 0,
      inputFocus: false
    };
  },
  methods: {
    newGame() {
      this.isPlaying = true;
      this.player = Math.floor(Math.random() * 2) === 0 ? 1 : 2;
      this.reset();
    },
    endGame() {
      this.isPlaying = false;
      this.reset();
    },
    reset() {
      this.currScorePlayer1 = 0;
      this.currScorePlayer2 = 0;
      this.scorePlayer1 = 0;
      this.scorePlayer2 = 0;
    },
    togglePlayer() {
      if (this.winner !== 0) return;
      if (this.player === 1) {
        this.player = 2;
        this.currScorePlayer1 = 0;
      } else {
        this.player = 1;
        this.currScorePlayer2 = 0;
      }
    },
    rollDice() {
      if (!this.isPlaying || this.winner !== 0) {
        if (!confirm('Start new game?')) return;
        this.newGame();
        return;
      }
      this.dice1 = randomNumber();
      this.dice2 = randomNumber();
      if (this.dice1 === 1 || this.dice2 === 1) {
        setTimeout(() => {
          this.togglePlayer();
        }, 500);
      } else {
        const totalScore = this.dice1 + this.dice2;
        if (this.player === 1) this.currScorePlayer1 += totalScore;
        else this.currScorePlayer2 += totalScore;
      }
      if (
        this.currScorePlayer1 + this.scorePlayer1 >= this.finalScore ||
        this.currScorePlayer2 + this.scorePlayer2 >= this.finalScore
      ) {
        this.hold();
      }
    },
    hold() {
      if (!this.isPlaying || this.winner !== 0) {
        return;
      }
      if (this.player === 1) {
        this.scorePlayer1 += this.currScorePlayer1;
      } else {
        this.scorePlayer2 += this.currScorePlayer2;
      }
      this.togglePlayer();
    },
    notPlaying() {
      this.isPlaying = false;
    },
    handleChangeFinalScore(data) {
      console.log(data);
      this.finalScore = data;
    }
  },
  computed: {
    winner() {
      if (this.player === 1 && this.scorePlayer1 >= this.finalScore) {
        this.notPlaying();
        return 1;
      } else if (this.player === 2 && this.scorePlayer2 >= this.finalScore) {
        this.notPlaying();
        return 2;
      }
      return 0;
    }
  },
  created() {
    window.addEventListener('keydown', event => {
      switch (event.code) {
        case 'KeyN':
          this.newGame();
          break;
        case 'KeyW':
          this.player === 1 && this.rollDice();
          break;
        case 'KeyS':
          this.player === 1 && this.hold();
          break;
        case 'ArrowUp':
          this.player === 2 && this.rollDice();
          break;
        case 'ArrowDown':
          this.player === 2 && this.hold();
          break;
        case 'Slash':
          this.inputFocus = true;
          break;
        case 'End':
          this.endGame();
          break;
      }
    });
  }
};
function randomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

body {
  background-image: linear-gradient(
      rgba(62, 20, 20, 0.4),
      rgba(62, 20, 20, 0.4)
    ),
    url('~@/assets/back.jpg');
  background-size: cover;
  background-position: center;
  font-family: Lato, sans-serif;
  font-weight: 300;
  position: relative;
  height: 100vh;
  color: #555;
}

.wrapper {
  width: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
</style>
