<template>
  <section>
        <div class="welcome-message text-center">
            <h1>Welcome to Our Store</h1>
            <div class="icons">
                <a href="login.html"><i class="bi bi-box-arrow-in-left"></i>Login</a>
            </div>
          </div>
      </section>
      <section>
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel" data-bs-interval="1800">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://kingbrink.github.io/all-images/images/land6.jpg" loading="lazy" class="d-block w-100 carousel-img" alt="...">
              <div class="carousel-caption">
                <h3 class="animate-pop1">ELITE.</h3>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://kingbrink.github.io/all-images/images/land8.jpg" loading="lazy" class="d-block w-100 carousel-img" alt="...">
              <div class="carousel-caption">
                <h3 class="animate-pop2">ULTIMATE.</h3>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://kingbrink.github.io/all-images/images/land2.jpg" loading="lazy" class="d-block w-100 carousel-img" alt="...">
              <div class="carousel-caption">
                <h3 class="animate-pop3">EXCLUSIVE.</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>

<script>
export default {

}
</script>

<style>

.welcome-message {
    background-color: #333333; /* Black background */
    padding: 20px 0; /* Padding for spacing */
    text-align: center;
    margin-top: 56px; /* Center text */
    display: flex;
    justify-content: space-between;
  }
  
  .welcome-message h1 {
    font-size: 1rem; /* Adjust the font size */
    color: #fff; /* White text color */
    margin: 0;
    margin-top: 13px;
    margin-left: 15px;
  }


  .icons{
    margin-top: 13px;
    margin-right: 15px;
    color: #fff;
  }

  .welcome-message a{
    color: #fff;
  }

  .carousel-img {
    height: 82vh; /* Adjust to the desired height */
    object-fit: cover;
  }

  .carousel-caption {
    position: absolute;
    top: 50vh; /* Positions the heading vertically at 40% of the viewport height */
    left: 5%; /* Positions the heading towards the left */
    transform: translateY(-50%); /* Centers the caption vertically */
    text-align: left; /* Aligns the text to the left */
    z-index: 10;
  }

  .carousel-caption h3 {
    color: #333333;
    padding: 10px 20px;
    font-size: 3rem; /* Increases the heading size */
    opacity: 0; /* Start hidden for animation */
  }

  /* Custom Pop Animations */
  @keyframes pop-in {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes fade-up {
    0% {
      transform: translateY(50px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Apply Different Animations */
  .animate-pop1 {
    animation: pop-in 1s forwards 0.5s; /* Slight delay for effect */
  }

  .animate-pop2 {
    animation: fade-up 1s forwards 0.5s;
  }

  .animate-pop3 {
    animation: zoom-in 1s forwards 0.5s;
  }
</style>