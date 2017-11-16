<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title text-center">{{ question }}</h3>
        </div>
        <div class="panel-body">
            <transition-group leave-active-class="animated rollOut">
              <div class="col-xs-12 col-sm-6 text-center" v-show="btnData[0].show" :key="btnData[0].index">
                  <button
                    class="btn btn-primary btn-lg"
                    style="margin: 10px"
                    @click="onAnswer(btnData[0])">{{ btnData[0].answer }}</button>
              </div>
              <div class="col-xs-12 col-sm-6 text-center" v-show="btnData[1].show" :key="btnData[1].index">
                  <button
                    class="btn btn-primary btn-lg"
                    style="margin: 10px"
                    @click="onAnswer(btnData[1])">{{ btnData[1].answer }}</button>
              </div>
              <div class="col-xs-12 col-sm-6 text-center" v-show="btnData[2].show" :key="btnData[2].index">
                  <button
                    class="btn btn-primary btn-lg"
                    style="margin: 10px"
                    @click="onAnswer(btnData[2])">{{ btnData[2].answer }}</button>
              </div>
              <div class="col-xs-12 col-sm-6 text-center" v-show="btnData[3].show" :key="btnData[3].index">
                  <button
                    class="btn btn-primary btn-lg"
                    style="margin: 10px"
                    @click="onAnswer(btnData[3])">{{ btnData[3].answer }}</button>
              </div>
            </transition-group>
        </div>
    </div>
</template>
<script>
    const MODE_ADDITION = 1;
    const MODE_SUBTRACTION = 2;
    export default{
        data() {
            return {
                question: 'Oops, an error ocurred :/',
                btnData: [
                    { index: 0, correct: true, answer: 0, show: true },
                    { index: 1, correct: false, answer: 0, show: true },
                    { index: 2, correct: false, answer: 0, show: true },
                    { index: 3, correct: false, answer: 0, show: true }
                ]
            };
        },
        methods: {
            generateQuestion() {
                const firstNumber = this.generateRandomNumber(1, 100);
                const secondNumber = this.generateRandomNumber(1, 100);
                const modeNumber = this.generateRandomNumber(1, 2);

                let correctAnswer = 0;

                switch (modeNumber) {
                    case MODE_ADDITION:
                        correctAnswer = firstNumber + secondNumber;
                        this.question = `What's ${firstNumber} + ${secondNumber}?`;
                        break;
                    case MODE_SUBTRACTION:
                        correctAnswer = firstNumber - secondNumber;
                        this.question = `What's ${firstNumber} - ${secondNumber}?`;
                        break;
                    default:
                        correctAnswer = 0;
                        this.question = 'Oops, an Error occurred :/';
                }

                this.btnData[0].answer = this.generateRandomNumber(correctAnswer - 10, correctAnswer + 10, correctAnswer);
                this.btnData[0].correct = false;
                this.btnData[1].answer = this.generateRandomNumber(correctAnswer - 10, correctAnswer + 10, correctAnswer);
                this.btnData[1].correct = false;
                this.btnData[2].answer = this.generateRandomNumber(correctAnswer - 10, correctAnswer + 10, correctAnswer);
                this.btnData[2].correct = false;
                this.btnData[3].answer = this.generateRandomNumber(correctAnswer - 10, correctAnswer + 10, correctAnswer);
                this.btnData[3].correct = false;

                const correctButton = this.generateRandomNumber(0, 3);
                this.btnData[correctButton].correct = true;
                this.btnData[correctButton].answer = correctAnswer;
            },
            generateRandomNumber(min, max, except) {
                const rndNumber = Math.round(Math.random() * (max - min)) + min;
                console.log(min, max, rndNumber);
                if (rndNumber == except) {
                    return this.generateRandomNumber(min, max, except);
                }
                return rndNumber;
            },
            onAnswer(data) {
                this.$emit('answered', data.correct);
                data.show = false;
            }
        },
        created() {
            this.generateQuestion();
        }
    }
</script>
