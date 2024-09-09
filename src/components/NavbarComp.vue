<template>
  <nav class="navbar navbar-expand-lg" id="navbar">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      KingSurf
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ms-auto">
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/about">About</router-link>
        <router-link class="nav-link" to="/products">Products</router-link>
        <router-link class="nav-link" id="usersRole" to="/admin" v-if="$cookies.get('jwt') && $cookies.get('role') === 'admin'">Admin</router-link>
        <router-link class="nav-link" to="/profile" v-if="$cookies.get('jwt')">Profile</router-link>
        <router-link class="nav-link" to="/login" v-if="!$cookies.get('jwt')">Login</router-link>
        <router-link class="nav-link" to="/contact">Contact</router-link>
        <router-link class="nav-link" id="cartXYZ" to="/cart" v-if="$cookies.get('jwt')">
          <i class="fa-solid fa-cart-shopping fa-lg" style="color: #0497c9;"></i> <span>{{$store.state.cartState.length}}</span>
        </router-link>
        <button v-if="$cookies.get('jwt')" @click="logOut()" class="btn bg-black">
          <i class="fa-solid fa-arrow-right-from-bracket fa-sm" style="color: #ffffff;"></i>
        </button>
      </div>
    </div>
  </div>
</nav>

</template>
<script>

export default {

data(){
return {
count : 0,
}
},

methods : {
watchCart(){

},
logOut(){
this.$store.dispatch('logoutUser')
},
checkRole(){
// this.$store.dispatch('loginUser')
const userRole = $cookies.get('role')
console.log(userRole)
if(userRole === 'admin'){
  console.log('you have access');
} else {
  console.log(`no access you are ${userRole}`);
}
}
}

}
</script>
<style scoped>
#navbar {
  background-color: #333333; /* Charcoal background */
  padding: 15px 20px;
}

.navbar-brand {
  font-size: 28px;
  font-weight: bold;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: 'Arial', sans-serif; /* Professional and clean font */
}

.navbar-brand:hover {
  color: #00aaff; /* Accent color on hover */
}

.navbar-nav .nav-link {
  color: #f0f0f0;
  margin-right: 20px;
  font-size: 16px;
  transition: color 0.3s ease-in-out;
}

.navbar-nav .nav-link:hover {
  color: #00aaff; /* Accent color for hover */
  background-color: #444444;
  border-radius: 5px;
  padding: 5px 10px;
}

.navbar-toggler {
  border-color: #ffffff;
}

.navbar-toggler-icon {
  color: #ffffff;
}

.navbar-toggler:hover {
  background-color: #444444;
}

.btn.bg-black {
  background-color: #000000;
  color: #ffffff;
}

.btn.bg-black:hover {
  background-color: #444444;
  color: #ffffff;
}

@media (max-width: 992px) {
  #navbar .navbar-nav {
    text-align: center;
  }

  .navbar-nav .nav-link {
    margin-bottom: 10px;
  }
}


  
</style>