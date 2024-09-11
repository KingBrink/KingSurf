<template>
  <div id="landing">

    <div class="container pt-5">

      <h1 class="text-white display-2 fw-bold pt-5" id="animate">KingSurf Store</h1>

      <div class="d-flex justify-content-center my-2">
        <dividerCompVue />
      </div>
      


      
      <textRenderVue data-compTxt RenderContent="Where every wave begins with the perfect board!"/>

      <router-link to="/login">

        <ButtonCompVue btnContent="login!" data-animate/>
        
      </router-link>

      <router-link to="/about">

        <ButtonCompVue btnContent="Know more" data-animate/>

      </router-link>


      <div class="d-flex justify-content-center my-2">
        <dividerCompVue />
      </div>

      
    </div>
  </div>
</template>

<script>
import ButtonCompVue from './ButtonComp.vue';
import dividerCompVue from './dividerComp.vue';
import textRenderVue from './textRender.vue';
export default {
  props: {
    msg: String
  },
  components : {
    ButtonCompVue,
    textRenderVue,
    dividerCompVue
  }
}
</script>


<style scoped>

#landing{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url('https://kingbrink.github.io/all-images/images/surfing.jpg');
  min-height: 100vh !important;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-image: fill 0 linear-gradient(rgba(0, 0, 0, 0.266) 50%, rgba(0, 0, 0, 0.329));
}

#animate{
  animation-name: onload;
  animation-duration: 0.7s;
}

[data-compTxt]{
  animation-name: onload;
  animation-duration: 1s;
  color: white !important;
  text-align: center;
}

[data-animate]{
  animation-name: onload;
  animation-duration: 1.25s;
  color: white !important;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

@keyframes onload {
  from {
    opacity: 0.1;
    transform: translateY(190px);
  }
  to{
    opacity: 1;
    transform: translateY(0px);
  }
}

@media (max-width: 555px) {

  #mediaIconContainer{
    display: flex;
    flex-direction: column;
  }
}
</style>
