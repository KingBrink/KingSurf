<template>
  <div id="about">
    <div class="px-4 pt-5 my-5 text-center">
      <h1 class="display-4 fw-bold text-body-emphasis" id="text">
        Take W's with KingSurf
      </h1>
      <div class="col-lg-6 mx-auto" data-aos="flip-right" data-aos-duration="3000" >
        <p class="lead mb-4 text-white">
          Discover the Passion Behind KingSurf At KingSurf, our story is deeply
          rooted in a profound love for the ocean. The waves have always been
          our sanctuary, a place of peace and tranquility. This connection with
          the sea inspired us to share our knowledge and experiences with
          others. Our journey began with a simple idea: to bring the joy of
          surfing to everyone.<br />
          Join us at KingSurf and embark on your surfing journey with
          confidence. Whether you're a seasoned pro or a newcomer eager to catch
          your first wave, we are here to support you every step of the way.
        </p>
        <router-link to="/products" class="btn mb-2 mx-1" id="button"
          >Explore our store</router-link
        >
        <router-link to="/contact" class="btn mb-2 mx-1" id="button"
          >Contact our store</router-link
        >
      </div>
      <div>
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
    </div>
    <div class="container px-4 py-5" id="hanging-icons">
      <h2 class="pb-2 border-bottom text-white fw-bold text-white">
        Access to the best Surfboards
      </h2>
      <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div class="col d-flex align-items-start">
          <div>
            <h3 class="fs-2 text-white">Ride the Waves with Confidence</h3>
            <p class="text-white">
              Our surfboards are crafted for all skill levels, offering
              unbeatable stability and control. Whether you're a beginner or a
              seasoned surfer, our boards will take your surfing experience to
              the next level.
            </p>
          </div>
        </div>
        <div class="col d-flex align-items-start">
          <div>
            <h3 class="fs-2 text-white">
              Top-Quality Boards Delivered to Your Door
            </h3>
            <p class="text-white">
              We believe in combining convenience with craftsmanship. Our
              surfboards are made from premium materials and delivered directly
              to you, ensuring you have access to the best, wherever you are.
            </p>
          </div>
        </div>
        <div class="col d-flex align-items-start">
          <div>
            <h3 class="fs-2 text-white">Surfboards for Every Budget</h3>
            <p class="text-white">
              At KingSurf, we make it easy for everyone to enjoy surfing. We
              offer a range of affordable options, so you can get a high-quality
              board without breaking the bank.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div></div>
  </div>
</template>
<script></script>
<style scoped>
#about {
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url("https://kingbrink.github.io/all-images/images/land8.jpg");
  min-height: 100vh !important;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-image: fill 0
    linear-gradient(rgba(0, 0, 0, 0.266) 50%, rgba(0, 0, 0, 0.329));
}

#text {
  background: #121fcf;
  background: linear-gradient(to right, #121fcf 0%, #cf1512 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

#button {
  position: relative;
  display: inline-block;
  background: linear-gradient(to bottom, #8439e6, #c75555);
  color: white;
  font-family: "Segoe UI", sans-serif;
  font-weight: bold;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  padding: 14px 28px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: btnHover 2s infinite;
  transition: all 0.3s ease-in-out;
}

#button:hover {
  background: linear-gradient(to bottom, #472c63, #5b67b7);
  animation: animation55 1s ease-in-out infinite;
  transform: translateY(-2px);
}

#button:active {
  transform: scale(0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

@keyframes btnHover {
  0% {
    background-position: left top;
  }

  100% {
    background-position: right bottom;
  }
}

@keyframes animation55 {
  0% {
    background-position: left top;
  }

  100% {
    background-position: right bottom;
  }
}

/* Smaller container for the 3D card */
.card-3d-container {
  width: 200px; /* Smaller width */
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
  background-image: url("https://kingbrink.github.io/all-images/images/surf1.JPG");
  background-size: cover;
  background-position: center;
  transform: rotateY(0deg) translateZ(100px); /* Adjusted translateZ */
}

/* Right face */
.card-face.right {
  background-image: url("https://kingbrink.github.io/all-images/images/surf3.jpg");
  background-size: cover;
  background-position: center;
  transform: rotateY(90deg) translateZ(100px); /* Adjusted translateZ */
}

/* Back face */
.card-face.back {
  background-image: url("https://kingbrink.github.io/all-images/images/surf2.JPG");
  background-size: cover;
  background-position: center;
  transform: rotateY(180deg) translateZ(100px); /* Adjusted translateZ */
}

/* Left face */
.card-face.left {
  background-image: url("https://kingbrink.github.io/all-images/images/surf4.jpg");
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
</style>
