<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Directives Exercise</h1>
                <!-- Exercise -->
                <!-- Build a Custom Directive which works like v-on (Listen for Events) -->
                <p v-surprise-me>Move the mouse to change my colors</p>
                <button v-execute:mouseenter.lazy="myFunction">Interact with me</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      directives: {
        'surprise-me': {
          bind (el, binding) {
            const randomColor = function() {
              return '#' + Math.floor(Math.random() * 16777215).toString(16);
            };
            el.addEventListener('mouseenter', function() {
              el.style.color = randomColor();
              el.style.backgroundColor = randomColor();
            });
            el.addEventListener('mouseleave', function() {
              el.style.color = randomColor();
              el.style.backgroundColor = randomColor();
            });
          }
        },
        'execute': {
          bind (el, binding) {
            const delay = binding.modifiers['lazy'] ? 2000 : 0;
            const fn = function() {
              setTimeout(() => {
                binding.value();
              }, delay);
            };
            el.addEventListener(binding.arg, fn);
          }
        }
      },
      methods: {
        myFunction () {
          alert('Function executed through custom directive');
        }
      }
    }
</script>

<style>
  h1 {
    text-align: center;
    margin-bottom: 100px;
  }
  p {
    width: 600px;
    height: 100px;
    border-style: solid;
    border-width: 1px;
    border-color: lightGray;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
  }
  button {
    margin-top: 50px;
  }
</style>
