<template>
  <section>


<div class="container">
    <h2>The Owner himself in action</h2>
    <!-- 3D card container -->
    <div class="card-3d-container">
        <div class="card-3d">
            <!-- Front face -->
            <div class="card-face front"></div>
            <!-- Right face -->
            <div class="card-face right"></div>
            <!-- Back face -->
            <div class="card-face back"></div>
            <!-- Left face -->
            <div class="card-face left"></div>
        </div>
    </div>
</div>
</section>
<section class="aboutsec">
<h2>About us</h2>
<p>Discover the Passion Behind KingSurf
    At KingSurf, our story is deeply rooted in a profound love for the ocean. The waves have always been our
    sanctuary, a place of peace and tranquility. This connection with the sea inspired us to share our knowledge
    and experiences with others. Our journey began with a simple idea: to bring the joy of surfing to everyone.</p>

    <p>As a dedicated lifeguard, I have always found fulfillment in helping and saving others. This passion
        naturally extended to the world of surfing. I realized that introducing people to the thrill of riding the
        waves was not just a hobby but a mission. Our goal is to ensure that everyone has the opportunity to
        experience the exhilaration of surfing.</p> 

    <p>Recognizing the lack of access to high-quality surfboards, we made it our mission to fill this gap. At
        KingSurf, we are committed to offering only the best surfboards available. We understand that having the
        right equipment is crucial to enjoying and mastering the sport, which is why we focus on top-quality gear
        that meets the highest standards.</p> 

     <p>Our commitment goes beyond just selling surfboards. We strive to make your life easier by delivering premium
        surfboards directly to your doorstep. We believe that everyone should have access to the best equipment
        without the hassle, and we are here to make that happen.</p>

    <p>Join us at KingSurf and embark on your surfing journey with confidence. Whether you're a seasoned pro or a
        newcomer eager to catch your first wave, we are here to support you every step of the way.</p>
<!-- <div class="img-box">
    <img src="https://kingbrink.github.io/all-images/images/wave8.png" class="back-img" alt="" loading="lazy">
    <img src="https://kingbrink.github.io/all-images/images/kyle8.PNG" class="main-img" alt="" loading="lazy">
</div> -->
</section>
</template>
<script>
</script>
<style scoped>
.card-3d-container {
    width: 200px;  /* Smaller width */
    height: 200px; /* Smaller height */
    position: relative;
    perspective: 1000px;
    margin: 100px auto;
  }
  
  /* 3D card setup */
  .card-3d {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    animation: rotateCard 10s infinite linear;
  }
  
  /* Each face of the 3D card */
  .card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border: 2px solid #fff;
  }
  
  /* Front face */
  .card-face.front {
    background-image: url('https://kingbrink.github.io/all-images/images/surf1.JPG');
    background-size: cover;
    background-position: center;
    transform: rotateY(0deg) translateZ(100px); /* Adjusted translateZ */
  }
  
  /* Right face */
  .card-face.right {
    background-image: url('https://kingbrink.github.io/all-images/images/surf3.jpg');
    background-size: cover;
    background-position: center;
    transform: rotateY(90deg) translateZ(100px); /* Adjusted translateZ */
  }
  
  /* Back face */
  .card-face.back {
    background-image: url('https://kingbrink.github.io/all-images/images/surf2.JPG');
    background-size: cover;
    background-position: center;
    transform: rotateY(180deg) translateZ(100px); /* Adjusted translateZ */
  }
  
  /* Left face */
  .card-face.left {
    background-image: url('https://kingbrink.github.io/all-images/images/surf4.jpg');
    background-size: cover;
    background-position: center;
    transform: rotateY(-90deg) translateZ(100px); /* Adjusted translateZ */
  }
  
  /* Rotate animation */
  @keyframes rotateCard {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }

  .aboutsec{
    justify-content: center;
    align-items: center;
  }


</style>