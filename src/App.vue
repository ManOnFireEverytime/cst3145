<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container px-4 px-lg-5">
      <div class="form-group">
        <input
          type="text"
          v-model="search"
          placeholder="Search"
          class="search form-control"
        />
      </div>
        
      <div class="form-group">
      <div id="sort-bar">
    <select class="sort btn btn-default" name="sortBy" id="select" v-model="sortBy">
      <option value="alphabetically">Subject</option>
      <option value="price">Price</option>
      <option value="location">Location</option>
      <option value="space">Availability</option>

    </select>
    <button v-on:click="ascending = !ascending" class="sort btn btn-default">
    <a class="sort btn btn-default" v-if="ascending">Ascending</a>
    <a class="sort btn btn-default" v-else>Descending</a>
    </button>
      </div>
      </div>

      <button class="btn btn-outline-dark" v-on:click="navigateTo('lessons')">
        Products
      </button>
      <button class="btn btn-outline-dark" v-on:click="navigateTo('cart')">
        Cart
        <span class="badge bg-dark text-white ms-1 rounded-pill">{{
          cartItemCount
        }}</span>
      </button>
    </div>
  </nav>


  <div v-if="page === 'lessons'">
    <section class="py-5">
      <div class="container px-4 px-lg-5 mt-5">
        <div
          class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
        >
          <div v-for="item in filteredLessons" :key="item.id" class="col mb-5">
            <div class="card h-100">

              <img
                v-bind:src="require('../images/' + item.image)"
                class="card-img-top"
                style="width: 250px; height: 200px"
              />
              <div class="card-body p-4">
                <div class="text-center">
                  <h5 class="fw-bolder">Subject: {{ item.Subject }}</h5>
                  <!-- <p>Icon: <i class="{{item.icon}}"></i></p> -->
                  <p>Location: {{ item.Location }}</p>
                  <p>Spaces: {{ item.Space - cartCount(item) }}</p>
                  Price: £{{ item.Price }}
                </div>
              </div>
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center" v-if="canAddToCart(item)">
                  <a
                    class="btn btn-outline-dark mt-auto"
                    v-on:click="addToCart(item)"
                    >Add to Cart</a
                  >
                </div>

                <div class="text-center disabled" v-else>
                  <a class="btn btn-outline-dark mt-auto">Add to Cart</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div v-if="page === 'cart'">
    <section class="py-5">
      <div class="container px-4 px-lg-5 mt-5">
        <div
          class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
        >
          <div v-for="item in cart" :key="item.id" class="col mb-5">
            <div class="card h-100">

              <img
                v-bind:src="require('../images/' + item.image)"
                class="card-img-top"
                style="width: 250px; height: 200px"
              />

              <div class="card-body p-4">
                <div class="text-center">
                  <h5 class="fw-bolder">Subject: {{ item.Subject }}</h5>
                  <!-- <p>Icon: <i class="{{item.icon}}"></i></p> -->
                  <p>Location: {{ item.Location }}</p>
                  <p>Spaces: {{ cartCount(item) }}</p>
                  Price: £{{ item.Price }}
                </div>
              </div>
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                  <a
                    class="btn btn-outline-dark mt-auto"
                    v-on:click="removeFromCart(item)"
                    >Remove From Cart</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="py-5 text-center">
          <h2>Checkout form</h2>
        </div>

        <div class="row">
          <div class="col-md-12 order-md-1">
            <form class="needs-validation">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <input
                    name="name"
                    type="text"
                    class="form-control invalid"
                    placeholder="Name"
                    pattern="[A-Za-z]{2,50}"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <input
                    name="phone"
                    type="text"
                    class="form-control invalid"
                    placeholder="Phone"
                    pattern="([0-9]{8,12})"
                    required
                  />
                </div>
              </div>
              <a
                class="col-md-12 mb-5 btn btn-primary btn-lg btn-block"
                v-on:click="submitForm"
              >
                Checkout
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import products from "/products.json";

export default {
  data() {
    return {
      data: products,
      page: "lessons",
      ascending: true,
      sortBy: 'alphabetically',
      cart: [],
      search: "",
      showProduct: true,
    };
  },
  methods: {
    addToCart(item) {
      this.cart.push(item);
    },
    isValid() {},
    sortedArray() {
      return this.data.sort((a, b) => a.Subject > b.Subject);
    },
    showCheckout() {
      this.showProduct = this.showProduct ? false : true;
    },
    canAddToCart(item) {
      return item.Space > this.cartCount(item);
    },
    cartCount(item) {
      let count = 0;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === item) {
          count++;
        }
      }
      return count;
    },
    navigateTo(page) {
      this.page = page;
    },
    removeFromCart(item) {
      this.cart.splice(this.cart.indexOf(item), 1);

    }, 
    submitForm() {
      alert("Submitted");
    },
  },
  computed: {
    filteredLessons: function() {
      let tempLessons = this.data;
      if (this.search != "" && this.search) {
        tempLessons = tempLessons.filter((item) => {
          return item.Subject.toLowerCase().match(this.search.toLowerCase());
        });
      }

      tempLessons = tempLessons.sort((a, b) => {
        if (this.sortBy == "alphabetically") {
          let fa = a.Subject.toLowerCase(),
            fb = b.Subject.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;

        } else if (this.sortBy == "price") {
          return a.Price - b.Price;
        } else if (this.sortBy == "location"){
          let fa = a.Location.toLowerCase(),
            fb = b.Location.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        }else if (this.sortBy == "space") {
          return a.Space - b.Space;
        }
      });
      if (!this.ascending) {
        tempLessons.reverse();
      }

      return tempLessons;
    },
    cartItemCount: function () {
      return this.cart.length || "";
    },
  },
};
</script>

<style>
input:focus {
  color: #222;
  background: #97abbe;
  border-color: #999;
}

input:valid {
  box-shadow: 0 0 2px rgba(0, 255, 0, 0.4);
}

input:valid:focus {
  background: #80be93;
  box-shadow: none;
}

input:invalid {
  box-shadow: 0 0 2px rgba(255, 0, 0, 0.4);
}
input:invalid:focus {
  background: #cb9089;
  box-shadow: none;
}
</style>
