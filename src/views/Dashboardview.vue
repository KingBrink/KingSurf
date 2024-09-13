<template>
    <div class="container-fluid admin-section pb-5">
      <div class="row pt-4">
        <h2 class="headings">Users</h2>
      </div>
      <button @click="showAddUserForm = true" class="add mt-3 mb-3">Add User</button>
      
      <!-- Add User Form -->
      <div v-if="showAddUserForm" class="modal-overlay">
        <form class="modal-content">
          <h3>Add New User</h3>
          <input v-model="newUser.user_image" type="text" placeholder="Profile URL">
          <input v-model="newUser.user_profile" type="text" placeholder="First Name">
          <input v-model="newUser.user_email" type="email" placeholder="Email">
          <input v-model="newUser.user_password" type="password" placeholder="Password">
          <button class="btn submit-btn mt-1 mb-1" @click.prevent="addUser">Submit</button>
          <button class="btn cancel-btn mt-1 mb-1" @click="showAddUserForm = false">Cancel</button>
        </form>
      </div>
  
      <!-- Responsive User Table -->
      <table class="table table-responsive">
        <thead>
          <tr>
            <th>Profile</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, user_id) in users" :key="user_id">
            <td><img :src="user.user_image" alt="profile" class="profile-img"></td>
            <td>{{ user.user_id }}</td>
            <td>{{ user.user_profile }}</td>
            <td>{{ user.user_email }}</td>
            <td>
              <button class="btn update-btn mt-1 mb-1" @click="openUpdateUserModal(user)">Update</button>
              <button class="btn delete-btn mt-1 mb-1" @click="deleteUser(user.user_id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Update User Modal -->
      <div v-if="showUpdateUserModal" class="modal-overlay">
        <form class="modal-content">
          <h3>Update User</h3>
          <input v-model="this.newUser.user_id" type="text" placeholder="Profile URL">
          <input v-model="newUser.user_image" type="text" placeholder="Profile URL">
          <input v-model="newUser.user_profile" type="text" placeholder="First Name">
          <input v-model="newUser.user_email" type="email" placeholder="Email">
          <input v-model="newUser.user_password" type="password" placeholder="Password">
          <button class="btn submit-btn mt-1 mb-1" @click.prevent="updateUser">Save changes</button>
          <button class="btn cancel-btn mt-1 mb-1" @click="closeUpdateUserModal">Cancel</button>
        </form>
      </div>
  
      <!-- Products Section -->
      <div class="row pt-4">
        <h2 class="headings">Products</h2>
      </div>
      <button @click="showAddProductForm = true" class="add mt-3 mb-3">Add Product</button>
  
      <!-- Add Product Form -->
      <div v-if="showAddProductForm" class="modal-overlay">
        <form class="modal-content">
          <h3>Add New Product</h3>
          <input v-model="newProduct.product_img" type="text" placeholder="Product URL">
          <input v-model="newProduct.product_name" type="text" placeholder="Product Name">
          <input v-model="newProduct.product_desc" type="text" placeholder="Description">
          <input v-model="newProduct.product_category" type="text" placeholder="Category">
          <input v-model="newProduct.product_price" type="text" placeholder="Price">
          <button class="btn submit-btn mt-1 mb-1" @click="addProduct">Submit</button>
          <button class="btn cancel-btn mt-1 mb-1" @click="showAddProductForm = false">Cancel</button>
        </form>
      </div>
  
      <!-- Responsive Product Table -->
      <table class="table products-table table-responsive mb-4">
        <thead>
          <tr>
            <th>Product</th>
            <th>ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td><img :src="product.product_img" alt="product" class="product-img"></td>
            <td>{{ product.product_id }}</td>
            <td>{{ product.product_name }}</td>
            <td>{{ product.product_desc }}</td>
            <td>{{ product.product_category }}</td>
            <td>R {{ product.product_price }}</td>
            <td>
              <button class="btn update-btn mt-1 mb-1" @click="openUpdateProductModal(product)">Update</button>
              <button class="btn delete-btn mt-1 mb-1" @click="deleteProduct(product.product_id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Update Product Modal -->
      <div v-if="showUpdateProductModal" class="modal-overlay">
        <form class="modal-content">
          <h3>Update Product</h3>
          <input v-model="currentProduct.product_img" type="text" placeholder="Product URL">
          <input v-model="currentProduct.product_name" type="text" placeholder="Product Name">
          <input v-model="currentProduct.product_desc" type="text" placeholder="Description">
          <input v-model="currentProduct.product_category" type="text" placeholder="Category">
          <input v-model="currentProduct.product_price" type="text" placeholder="Price">
          <button class="btn submit-btn mt-1 mb-1" @click="updateProducts(currentProduct)">Save changes</button>
          <button class="btn cancel-btn mt-1 mb-1" @click="closeUpdateProductModal">Cancel</button>
        </form>
      </div>
    </div>
  </template>
    <script>
    import { mapState, mapActions } from 'vuex'
        export default {
            name: 'DashView',
            data() {
        return {
          showAddUserForm: false,
          showAddProductForm: false,
          showUpdateUserModal: false,
          showUpdateProductModal: false,
          newUser: {
          user_image: "https://codjoelmayer.github.io/projectImages/images/profile-Image.png",
          user_profile: '',
          user_email: '',
          user_password: ''
        },
        newProduct: {
          product_img: '',
          product_name: '',
          product_desc: '',
          product_category: '',
          product_price: '',
        },
        currentUser: {},
        currentProduct: {}
      };
    },
      computed: {
        ...mapState(['users', 'products'])
      },
      methods: {
        ...mapActions(['getUsers', 'fetchProducts', 'updateUser', 'deleteUser', 'updateProducts', 'deleteProduct']),
        openUpdateUserModal(user) {
          this.currentUser = { ...user };
          this.showUpdateUserModal = true;
        },
        closeUpdateUserModal() {
          this.showUpdateUserModal = false;
        },
        updateUser() {
          this.$store.dispatch('updateUser', {id: this.newUser.user_id, data: this.newUser }).then(() => {
            this.showUpdateUserModal = false;
          });
        },
        deleteUser(user_id) {
          if (confirm('Are you sure you want to delete this user?')) {
            this.$store.dispatch('deleteUser', user_id).then(() => {
              this.getUsers();
            });
          }
        },
        openUpdateProductModal(product) {
          this.currentProduct = { ...product };
          this.showUpdateProductModal = true;
        },
        closeUpdateProductModal() {
          this.showUpdateProductModal = false;
        },
        updateProducts() {
          this.$store.dispatch('updateProducts', { ...this.currentProduct, product_id: this.currentProduct.product_id }).then(() => {
            this.showUpdateProductModal = false;
          })
          .catch(error => {
            console.error('Error updating user:', error)
            alert('Failed to update user')
          })
        },
        deleteProduct(product_id) {
          if (confirm('Are you sure you want to delete this product?')) {
            this.$store.dispatch('deleteProduct', product_id).then(() => {
              this.fetchProducts();
            });
          }
        },
        addUser() {
          if (this.newUser.user_image && this.newUser.user_profile && this.newUser.user_email && this.newUser.user_password) {
            this.$store.dispatch('addNewUser', this.newUser).then(() => {
              this.showAddUserForm = false;
              this.newUser = { user_image: "https://codjoelmayer.github.io/projectImages/images/profile-Image.png", user_profile: '', user_email: '', user_password: '' };
            }).catch(error => {
              console.error('Error adding user:', error)
              alert('Failed to add user')
            })
          } 
        },
        addProduct() {
          if (this.newProduct.product_img && this.newProduct.product_name && this.newProduct.product_desc && this.newProduct.product_category && this.newProduct.product_price  && this.newProduct.quantity ) {
            this.$store.dispatch('addProduct', this.newProduct).then(() => {
              this.showAddProductForm = false;
              this.newProduct = { product_img: '', product_name: '', product_desc: '', product_category: '',product_price: '' };
            });
          } 
        }
      },
      mounted() {
        this.getUsers();
        this.fetchProducts();
      }
        }
    </script>
    <style scoped>
    /* Modal Styling */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      max-width: 500px;
      width: 100%;
    }
    
    /* Button Styling */
    .btn {
      padding: 10px 15px;
      border: none;
      color: white;
      cursor: pointer;
      border-radius: 5px;
    }
    .submit-btn {
      background: linear-gradient(to bottom, #472c63, #5b67b7);
    }
    .submit-btn:hover {
      background: linear-gradient(to bottom, #8439e6, #c75555);
    }
    .cancel-btn {
      background: linear-gradient(to right, #121fcf 0%, #cf1512 100%);
    }
    .cancel-btn:hover {
      background: linear-gradient(to right, #cf1512, #121fcf);
    }
    .update-btn, .delete-btn {
      background: linear-gradient(to bottom, #472c63, #5b67b7);
    }
    .update-btn:hover, .delete-btn:hover {
      background: linear-gradient(to bottom, #8439e6, #c75555);
    }

    .add{
        background: linear-gradient(to bottom, #8439e6, #c75555);
        border-radius: 30px;
        color: white;
    }
    
    /* Responsive Images */
    .profile-img, .product-img {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
    
    /* Responsive Tables */
    @media (max-width: 768px) {
      table, thead, tbody, th, td, tr {
        display: block;
      }
      thead tr {
        display: none;
      }
      tbody tr {
        margin-bottom: 10px;
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 5px;
      }
      tbody tr td {
        text-align: right;
        position: relative;
        padding-left: 50%;
      }
      tbody tr td::before {
        content: attr(data-label);
        position: absolute;
        left: 0;
        width: 50%;
        padding-left: 10px;
        font-weight: bold;
      }
    }
    </style>