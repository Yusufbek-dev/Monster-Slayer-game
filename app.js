function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMassages: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value <= 0) {
        // monster lost
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.monsterHealth + "%" };
      }
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    startAgain() {
      (this.playerHealth = 100),
        (this.monsterHealth = 100),
        (this.currentRound = 0),
        (this.winner = null),
        (this.logMassages = []);
    },
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMassage('player', 'attack', attackValue)
      this.currentRound++;
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMassage('monster', 'attack', attackValue)
    },
    specialAttackMonster() {
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMassage('player', 'attack', attackValue)
      this.currentRound++;
    },
    healPlayer() {
      this.currentRound++;
      this.attackPlayer();
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
        this.addLogMassage('player', 'heal', healValue)
      }
      
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMassage(who, what, value) {
      this.logMassages.unshift({
        actionBy:who,
        actionType:what,
        actionValue:value,
      })
    }
  },
});

app.mount("#game");
