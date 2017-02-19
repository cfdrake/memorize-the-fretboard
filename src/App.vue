<template lang="pug">
div#app
  router-view
  div.footer made by: &nbsp;
    <a class='footer-link' target='_blank' href='https://twitter.com/colinfdrake'>@colinfdrake</a> &hellip;
    <a class='footer-link' target='_blank' href='https://github.com/cfdrake/memorize-the-fretboard'>source &rarr;</a>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: Avenir, sans-serif;
  font-weight: lighter;
  color: #333;
}

#app {
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
}

.footer {
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: center;
  font-size: 12px;
  margin: 1em;
  color: #999;
}

.footer-link {
  text-decoration: none;
  color: black;
}
</style>
