<template>
  <div>
    <button class="control btn-new" @click="newGame()">
      <i class="ion-ios-plus-outline"></i>New game
    </button>
    <button class="control btn-roll" @click="rollDice()">
      <i class="ion-ios-loop"></i>Roll dice
    </button>
    <button class="control btn-hold" @click="hold()">
      <i class="ion-ios-download-outline"></i>Hold
    </button>

    <label for="final-score">
      <input
        id="final-score"
        type="number"
        placeholder="Final score"
        class="final-score"
        :value="finalScore"
        @input="$emit('changeFinalScore', parseInt($event.target.value))"
        :disabled="isPlaying && 'disabled'"
        ref="input"
      />
    </label>
  </div>
</template>
<script>
export default {
  name: 'controls',
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    },
    finalScore: {
      type: Number,
      default: 0
    },
    inputFocus: Boolean
  },
  methods: {
    newGame() {
      this.$emit('newGame');
    },
    rollDice() {
      this.$emit('rollDice');
    },
    hold() {
      this.$emit('hold');
    }
  },
  watch: {
    inputFocus() {
      this.$refs.input.focus();
    }
  }
};
</script>

<style lang="scss">
.control {
  position: absolute;
  width: 200px;
  left: 50%;
  transform: translateX(-50%);
  color: #555;
  background: none;
  border: none;
  font-family: Lato;
  font-size: 20px;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 300;
  transition: background-color 0.3s, color 0.3s;
}
.control.disable {
  pointer-events: none;
}

.control:hover {
  font-weight: 600;
}
.control:hover i {
  margin-right: 20px;
}

.control:focus {
  outline: none;
}

.control i {
  color: #42b983;
  display: inline-block;
  margin-right: 15px;
  font-size: 32px;
  line-height: 1;
  vertical-align: text-top;
  margin-top: -4px;
  transition: margin 0.3s;
}

.btn-new {
  top: 45px;
}
.btn-roll {
  top: 403px;
}
.btn-hold {
  top: 467px;
}

.final-score {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 520px;
  color: #555;
  font-size: 18px;
  font-family: 'Lato';
  text-align: center;
  padding: 10px;
  width: 160px;
  text-transform: uppercase;
}

.final-score:focus {
  outline: none;
}
</style>
