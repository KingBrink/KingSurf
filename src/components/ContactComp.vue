<template><div class="container" id="contact">
  <h3 id="text" style="margin-top: 80px;">Contact us</h3>
  <div class="row" style="margin-top: 50px;">
      <div class="col-md-4 py-3 py-md-0">
          <div class="card">
              <i class="bi bi-telephone"> Phone</i>
              <h6>+ 068 345 1298</h6>
          </div>
      </div>
      <div class="col-md-4 py-3 py-md-0">
          <div class="card">
              <i class="bi bi-envelope"> Email</i>
              <h6>KingSurf@gmail.com</h6>
          </div>
      </div>
      <div class="col-md-4 py-3 py-md-0">
          <div class="card">
              <i class="bi bi-geo-alt"> Address</i>
              <h6>KingSurf Street</h6>
          </div>
      </div>
  </div>
  <div class="row" style="margin-top: 30px;">
      <form action="https://formspree.io/f/xleqzzyb" method="POST" class="form" id="myForm" style="padding-bottom: 7%;" >
           <div class="row justify-content-center">
             <div class="col-5">
               <input type="text" class="form-control" name="name" placeholder="First name" aria-label="First name" required>
             </div>
             <div class="col-5">
               <input type="text" class="form-control" name="lastname" placeholder="Last name" aria-label="Last name" required>
             </div>
           </div>
           <div class="row justify-content-center">
             <div class="col-10 mb-3">
               <label for="exampleInputEmail1" class="form-label"></label>
               <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="Your Email" required>
               <div id="emailHelp" class="form-text"></div>
             </div>

             <div class="col-10 mb-3">
               <label for="exampleFormControlTextarea1" class="form-label"></label>
               <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" name="message"
                 placeholder="Enter Message Here" required></textarea>
             </div>
           </div>
           <div class="mx-5">
             <button type="submit" class="btn1 subButton" name="submit">Submit</button>
             <button type="button" id="clearButton" class="btn1" @click.prevent="clearForm()">Clear</button>
           </div>
         </form>
  </div>
</div>
</template>

<script>
export default{
 data(){
     return {
         
     }
 },
 methods:{

     // Function to clear the form fields
     clearForm() {
       document.getElementById("myForm").reset();
     }
 }
}
</script>

<style>

#text {
  background: #121fcf;
  background: linear-gradient(to right, #121fcf 0%, #cf1512 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 40px;
}

#contact{
  margin-top: 50px;
}
#contact .card{
  height: 80px;
  margin-top: 20px;
  box-shadow: black;
}
#contact .card i{
  margin-top: 10px;
  margin-left: 10px;
  font-size: 15px;
  color: #162052;
  font-weight: bold;
  letter-spacing: 3px;
}
#contact .card h6{
  margin-left: 10px;
  margin-top: 10px;
  letter-spacing: 3px;
  font-weight: bold;
  color: black;
}
.deats {
 margin-top: 20px;
}

.deats a, .deats text {
 margin-bottom: 10px;
 color: blue;
 font: bold;
 font-size: 20px;
}

/* Font Awesome icon styles */
.fa {
 margin-right: 5px;
}

/* .icons a {
 padding: 0;
 font-size: 20px;
 color: #ff0157;
} */

.img-thumbnail{
 max-width: 25vw;
 max-height: 25vh;
}

.products{
 justify-content: center;
 align-items: center;
}

.prodCard{
 height: 550px;
}

.homeCard{
 text-align: center;
}

.btn-grp{
 justify-content: center;
 align-items: center;
}
.btn1{
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
.btn1:hover{
  background-color: orange;
  color: #162052;
}
.contact-details {
 display: flex;
 flex-direction: column;
}

.email-link,
.phone-number {
 margin: 5px; 
 display: flex;
 justify-content: center;
 align-items: center;
}


.footer-bar {
 display: flex;
 justify-content: center;
 align-items: center;
}

.social-icons {
 display: flex;
 justify-content: space-between;
 width: 120px; 
}

.social-icons a {
 text-decoration: none;
 color: inherit;
}

.social-icons i {
 font-size: 24px; /* Adjust icon size as needed */
}
@media (min-width:300px) and (max-width:500px) {
.cinfo{
  font-size: 5px;
}
}
</style>