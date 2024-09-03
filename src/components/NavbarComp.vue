<template>
  <nav class="navbar bg-body-tertiary fixed-top">
    <div class="container-fluid">
        <!-- Brand -->
        <a class="navbar-brand" href="#">
            KingSurf <i class="icon bi bi-tsunami"></i>
        </a>

        <!-- Navbar toggler (hamburger icon) - only shows on small screens -->
        <button class="navbar-toggler d-lg-none d-md-none d-sm-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Offcanvas menu -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/products">Products</router-link>
                    </li>
                    <li class="nav-item" v-if="$cookies.get('jwt') && $cookies.get('role') === 'admin'">
                        <router-link class="nav-link" to="/admin">Admin</router-link>
                    </li>
                    <li class="nav-item" v-if="$cookies.get('jwt')">
                        <router-link class="nav-link" to="/profile">Profile</router-link>
                    </li>
                    <li class="nav-item" v-if="!$cookies.get('jwt')">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/contact">Contact</router-link>
                    </li>
                    <li class="nav-item" v-if="$cookies.get('jwt')">
                        <router-link class="nav-link" to="/cart">
                            <i class="fa-solid fa-cart-shopping fa-lg" style="color: #0497c9;"></i>
                            <span>{{$store.state.cartState.length}}</span>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="$cookies.get('jwt')">
                        <button @click="logOut()" class="btn bg-black">
                            <i class="fa-solid fa-arrow-right-from-bracket fa-sm" style="color: #ffffff;"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Regular Navbar Links (visible on screens larger than 425px) -->
        <div class="d-none d-lg-flex d-md-flex d-sm-none ms-auto">
            <ul class="navbar-nav flex-row">
                <li class="nav-item me-3">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item me-3">
                    <router-link class="nav-link" to="/about">About</router-link>
                </li>
                <li class="nav-item me-3">
                    <router-link class="nav-link" to="/products">Products</router-link>
                </li>
                <li class="nav-item" v-if="$cookies.get('jwt') && $cookies.get('role') === 'admin'">
                    <router-link class="nav-link" to="/admin">Admin</router-link>
                </li>
                <li class="nav-item" v-if="$cookies.get('jwt')">
                    <router-link class="nav-link" to="/profile">Profile</router-link>
                </li>
                <li class="nav-item" v-if="!$cookies.get('jwt')">
                    <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/contact">Contact</router-link>
                </li>
                <li class="nav-item" v-if="$cookies.get('jwt')">
                    <router-link class="nav-link" to="/cart">
                        <i class="fa-solid fa-cart-shopping fa-lg" style="color: #0497c9;"></i>
                        <span>{{$store.state.cartState.length}}</span>
                    </router-link>
                </li>
                <li class="nav-item" v-if="$cookies.get('jwt')">
                    <button @click="logOut()" class="btn bg-black">
                        <i class="fa-solid fa-arrow-right-from-bracket fa-sm" style="color: #ffffff;"></i>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</nav>

</template>

<script>
export default {

}
</script>

<style>

/* Style for the navbar logo container */
.navbar-brand {
    display: inline-flex; /* Align text and icon horizontally */
    align-items: center;  /* Center the items vertically */
    padding: 10px;   
    background-color: #333333; /* Black background for the block */
    color: white;         /* White text color */
    font-weight: bold;    /* Bold text */
    border-radius: 5px;
  }
  
  /* Style for the icon */
  .navbar-brand .icon {
    margin-left: 5px;     /* Space between the text and the icon */
    font-size: 1.2em;     /* Adjust icon size if needed */
  }
</style>