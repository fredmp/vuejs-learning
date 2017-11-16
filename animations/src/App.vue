<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>CSS Animations</h1>
                <hr>
                <select class="form-control" v-model="animationType">
                  <option value="fade">Fade</option>
                  <option value="slide">Slide</option>
                </select>
                <br>
                <button class="btn btn-primary" @click="show = !show">Show Alert</button>
                <br>
                <br>
                <transition :name="animationType" mode="out-in">
                  <div v-if="show" class="alert alert-info" key="info">Alert</div>
                  <div v-else class="alert alert-warning" key="warn">Warning</div>
                </transition>
                <transition :name="animationType" appear>
                  <div v-if="show" class="alert alert-info">Transitions</div>
                </transition>
                <transition name="fade">
                  <div v-if="show" class="alert alert-info">Animations</div>
                </transition>
                <transition name="slide" type="animation">
                  <div v-if="show" class="alert alert-info">Animations and Transitions</div>
                </transition>
                <transition
                  appear
                  enter-active-class="animated fadeInUp"
                  leave-active-class="animated zoomOut"
                >
                  <div v-if="show" class="alert alert-info">External Library - Animate</div>
                </transition>
                <hr>
                <h1>JS Animations</h1>
                <button class="btn btn-primary" @click="load = !load">Load - Remove Element</button>
                <br>
                <br>
                <transition
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @after-enter="afterEnter"
                  @enter-cancelled="enterCancelled"
                  @before-leave="beforeLeave"
                  @leave="leave"
                  @after-leave="afterLeave"
                  @leave-cancelled="leaveCancelled"
                  :css="false">
                  <div class="load-div" v-if="load"></div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
              show: true,
              load: false,
              animationType: 'fade'
            }
        },
        methods: {
          beforeEnter (el) {
            console.log('beforeEnter');
            el.style.width = '100px';
          },
          enter (el, done) {
            console.log('enter');
            let round = 1;
            const initialWidth = 100;
            const interval = setInterval(function () {
              el.style.width = (initialWidth + round * 10) + 'px';
              round++;
              if (round > 20) {
                clearInterval(interval);
                done();
              }
            }, 20);
          },
          afterEnter (el) {
            console.log('afterEnter');
          },
          enterCancelled (el) {
            console.log('enterCancelled');
          },
          beforeLeave (el) {
            console.log('beforeLeave');
            el.style.width = '300px';
          },
          leave (el, done) {
            console.log('leave');
            let round = 1;
            const initialWidth = 100;
            const interval = setInterval(function () {
              el.style.width = (initialWidth - round * 10) + 'px';
              round++;
              if (round > 20) {
                clearInterval(interval);
                done();
              }
            }, 20);
          },
          afterLeave (el) {
            console.log('afterLeave');
          },
          leaveCancelled (el) {
            console.log('leaveCancelled');
          }
        }
    }
</script>

<style>
  .load-div {
    width: 300px;
    height: 100px;
    background-color: lightGreen;
  }

  /*Transitions*/
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: opacity 1s;
  }
  .fade-leave {
    /*Not necessary*/
    /*opacity: 1;*/
  }
  .fade-leave-active {
    transition: opacity 1s;
    opacity: 0;
  }

  /*Animations*/
  .slide-enter {
    /*Not necessary*/
    /*transform: translateY(20px);*/
    opacity: 0;
  }
  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition: opacity 1s;
  }
  .slide-leave {
    /*Not necessary*/
  }
  .slide-leave-active {
    animation: slide-out 1s ease-out forwards;
    transition: opacity 3s;
    opacity: 0;
  }

  @keyframes slide-in {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(20px);
    }
  }
</style>
