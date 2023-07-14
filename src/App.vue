<template>
  <div id="app" class="container">
    <!-- <GroundRat></GroundRat> -->
    <!-- <GroundRat></GroundRat> -->
    <bubbleDiagram></bubbleDiagram>
    <!-- <HtmlToPDF></HtmlToPDF> -->
  </div>
</template>

<script>
  // import LazyLoad from '@/components/photoOptimize/lazyLoading.vue';
  import bubbleDiagram from '@/components/g6/bubbleDiagram.vue';
  // import GroundRat from '@/components/game/groundRat.vue';

  export default {
    name: 'App',
    components: {
      // GroundRat
      // GroundRat
      bubbleDiagram
    },
    data () {
      return {
        getDatas: {
          "name": "March 10",
          "children": [
            {
              "name": "Montreal",
              "percentage": "60%",
              "children": [
                {
                  "name": "Digit",
                  "percentage": "80%",
                  "children": [
                    {
                      "name": "Data Visualization",
                      "percentage": "80%"
                    },
                    {
                      "name": "Adversarial Training",
                      "percentage": "20%"
                    }
                  ]
                },
                {
                  "name": "Interval",
                  "percentage": "20%"
                }
              ]
            },
            {
              "name": "Information C",
              "percentage": "10%"
            },
            {
              "name": "Information B",
              "percentage": "20%"
            },
            {
              "name": "Number",
              "percentage": "20%"
            },
            {
              "name": "Position",
              "percentage": "20%",
              "children": [
                {
                  "name": "Information",
                  "percentage": "20%"
                },
                {
                  "name": "30 Minutes",
                  "percentage": "20%"

                }
              ]
            }
          ]
        }
      }
    },
    created () {
      //
    },
    methods: {

    }

  }
</script>

<style>
</style>