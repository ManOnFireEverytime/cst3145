const app = new Vue({
  el: "#app",
  data: {
    products: products,
    page: "lessons",
    onHome: true,
    ascending: true,
    sortBy: "alphabetically",
    cart: [],
    search: "",
    showProduct: true,
  },
  methods: {
    changePage() {
      this.onHome = !this.onHome;
    },
    addToCart(item) {
      this.cart.push(item);
    },
    sortedArray() {
      return this.products.sort((a, b) => a.Subject > b.Subject);
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
      this.cart.splice(this.cart.item, 1);
      if (this.cart.length <= 0) {
        this.changePage();
      }
    },
    submitForm() {
      alert("Submitted");
    },
  },
  computed: {
    filteredLessons: function () {
      let tempLessons = this.products;

      //Search Function
      if (this.search != "" && this.search) {
        tempLessons = tempLessons.filter((item) => {
          return (
            item.Subject.toLowerCase().match(this.search.toLowerCase()) || item.Location.toLowerCase().match(this.search.toLowerCase())
          );
        });
      }


      //Sorting Function
      tempLessons = tempLessons.sort((a, b) => {
        if (this.sortBy == "subject") {
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
        } else if (this.sortBy == "location") {
          let fa = a.Location.toLowerCase(),
            fb = b.Location.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        } else if (this.sortBy == "space") {
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
});