new Vue({
  el: '#app',
  data: {
    turns            : [],
    playerHealth     : 100,
    monsterHealth    : 100,
    availableHealigns: 5,
    gameIsRunning    : false,
    specialAttackUsed: false,
  },
  watch: {
    playerHealth: function(value) {
      if(value <= 0) this.finish('You lost!');
    },
    monsterHealth: function(value) {
      if(value <= 0) this.finish('You won!');
    }
  },
  methods: {
    startGame: function() {
      this.turns             = [],
      this.gameIsRunning     = true;
      this.playerHealth      = 100;
      this.monsterHealth     = 100;
      this.availableHealigns = 5;
      this.specialAttackUsed = false;
    },
    attack: function(target, min, max) {
      const isPlayer          = target === 'monster';
      const damage            = this.randomNumber(min, max);
      this[`${target}Health`] = Math.max(this[`${target}Health`] - damage, 0);
      this.logTurn(isPlayer, `${isPlayer ? 'Player' : 'Monster'} hits ${target.toUpperCase()} for ${damage}`);
      if(isPlayer) {
        this.monsterRound();
      }
    },
    specialAttack: function(target, min, max) {
      const isPlayer = target === 'monster';
      const damage   = this.randomNumber(min, max);
      if(!isPlayer || !this.specialAttackUsed) {
        this[`${target}Health`] = Math.max(this[`${target}Health`] - damage, 0);
        this.logTurn(isPlayer, `${isPlayer ? 'Player' : 'Monster'} hits ${target.toUpperCase()} hard for ${damage}`);
      }
      if(isPlayer) {
        this.specialAttackUsed = true;
        this.monsterRound();
      }
    },
    heal: function() {
      if(this.availableHealigns > 0) {
        const healing = this.randomNumber(10, 20);
        this.playerHealth = Math.min(this.playerHealth + healing, 100);
        this.availableHealigns--;
        this.logTurn(true, `Player heals for ${healing}`);
        this.monsterRound();
      }
    },
    giveUp: function(target) {
      this.logTurn(target === 'player', `${target.toUpperCase()} gave up`);
      this.gameIsRunning = false;
    },
    randomNumber: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    monsterRound: function() {
      if(!this.gameIsRunning) {
        return;
      }
      const behavior = this.randomNumber(1, 100);
      if(behavior > 80 && this.monsterHealth < 25) {
        this.giveUp('monster'); // 20% chance of give up when monster has less than 1/4 of health
      } else if(behavior > 95) {
        this.specialAttack('player', 20, 60); // a few chances of a hard attack
      } else {
        this.attack('player', 5, 12);
      }
    },
    finish: function(message) {
      if(confirm(`${message} New game?`)) {
        this.startGame();
      } else {
        this.gameIsRunning = false;
      }
    },
    logTurn: function(isPlayer, text) {
      this.turns.unshift({isPlayer, text});
    },
  },
});
