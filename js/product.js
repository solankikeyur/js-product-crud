let sortBy = localStorage.getItem("sortBy");
let productId = null;
let category = null;

const getLastId = () => {
  const products = getAllProducts();
  if (products.length > 0) {
    let productIds = products.map((product) => {
      return product.id;
    });
    return Math.max(...productIds);
  }
  return 0;
};

const saveProduct = () => {
  let products = getAllProducts();
  let productData = {};
  const formData = $("#productForm").serializeArray();
  formData.forEach((data) => {
    productData[data.name] = data.value;
  });
  if (productId && typeof productId !== "undefined") {
    products.map((product, index) => {
      if (product.id == productId) {
        productData.id = productId;
        products[index] = productData;
      }
    });
  } else {
    id = getLastId();
    productData.id = id + 1;
    products.push(productData);
    $("#productForm").trigger("reset");
  }
  setProducts(products);
  sortProducts("title");
  location.hash = "#products";
};

const setProducts = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

const getAllProducts = () => {
  return JSON.parse(localStorage.getItem("products")) ?? [];
};

const toggleSortBy = () => {
  sortBy = sortBy == "ASC" ? "DESC" : "ASC";
  localStorage.setItem("sortBy", sortBy);
};

const sortProducts = (key) => {
  let collection = getAllProducts().sort((productOne, productTwo) => {
    productOne = productOne[key];
    productTwo = productTwo[key];
    if (productOne > productTwo) {
      return sortBy == "ASC" ? 1 : -1;
    } else if (productOne < productTwo) {
      return sortBy == "ASC" ? -1 : 1;
    }
    return 0;
  });
  setProducts(collection);
  return collection;
};

const loadProducts = (sort = false) => {
  if (sort) {
    toggleSortBy();
    sortProducts("title");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    let products = getAllProducts();
    return getProductGridHtml(products);
  }
};

const deleteProduct = (id) => {
  if (confirm("Are you sure ?")) {
    let products = getAllProducts();
    if (products.length > 0) {
      products = products.filter((product) => {
        return product.id != id;
      });
      setProducts(products);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  }
};

const setProduct = (id = null) => {
  productId = id;
  location.hash = "#editProduct";
};

const fillEditProductForm = () => {
  if (productId && typeof productId !== "undefined") {
    const products = getAllProducts();
    const product = products.find((product) => product.id == productId);
    if (typeof product !== "undefined") {
      $("#productTitle").val(product.title);
      $("#productPrice").val(product.price);
      $("#productDescription").val(product.description);
      $("#productCategory").val(product.category);
    } else {
      alert("No product found.");
      location.hash = "#products";
    }
  } else {
    alert("No product found.");
    location.hash = "#products";
  }
};

const getCategories = () => {
  return [
    { value: 1, name: "Mobile" },
    { value: 2, name: "TV" },
    { value: 3, name: "Clothing" },
    { value: 4, name: "Footwear" },
  ];
};

const loadCategoriesGridHtml = () => {
  const categories = getCategories();
  let html = ``;
  categories.map((category) => {
    html += `<tr>
      <td>${category.name}</td>
      <td>
        <a href="javascript:void(0)" onClick="setCategory(${category.value})">View</a>
      </td>
    </tr>`;
  });

  return `<h3>Categories</h3>
  <table class="table table-bordered table-striped mt-4">
      <thead>
          <tr>
              <th>Category Name</th>
              <th>View Products</th>
          </tr>
      </thead>
      <tbody id="categoryGrid">
          ${html}
      </tbody>
  </table>`;
};

const setCategory = (id) => {
  const categories = getCategories();
  category = categories.find((cat) => cat.value == id);
  location.hash = "#categoryProducts";
};

const getProductGridHtml = (products) => {
  let html = ``;
  const categories = getCategories();

  if (products.length > 0) {
    let categoryDetails = null;
    products.forEach((product) => {
      let productImage = product.image ?? "img/default.png";
      categoryDetails =
        categories.find((category) => category.value == product.category) ??
        "-";

      html += `<tr>
                <td class="text-center">
                    <img src="${productImage}" alt="${
        product.title
      }" width="100" height="100" />
                </td>
                <td>${product.title ?? "-"}</td>
                <td>${categoryDetails.name ?? "-"}</td>
                <td>${product.price ?? "0"}</td>
                <td>
                    <a href="javascript:void(0)" onClick="setProduct(${
                      product.id
                    })"  >Edit</a>
                    <a href="javascript:void(0)" onClick="deleteProduct(${
                      product.id
                    })" >Delete</a>
                </td>
            </tr>`;
    });
   
  } else {
    html = `<tr><td colspan="10" class="text-center">No products found.</td></tr>`;
  }
  return `<h3 id="productGridTitle">Products</h3>
  <table class="table table-bordered table-striped mt-4">
      <thead>
          <tr>
              <th>Product Image</th>
              <th onclick="loadProducts(true)">Product Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
          </tr>
      </thead>
      <tbody id="productGrid">
          ${html}
      </tbody>
  </table>`;
}; 

const validateProductForm = () => {
  $("#productForm").validate({
    rules: {
      title: {
        required: true,
      },
      price: {
        required: true,
        number: true,
      },
      category: {
        required: true,
      },
      description: {
        required: true,
      },
    },
    submitHandler: (form, e) => {
      e.preventDefault();
      saveProduct();
      return false;
    },
  });
};

const categoryProductsHtml = () => {
  let products = getAllProducts();
  if (category && typeof category !== "undefined") {
    products = products.filter((product) => {
      return product.category == category.value;
    });
  }  else {
    products = [];
  }
  return getProductGridHtml(products);
};

const setCategoryTitle = () => {
  if(category && typeof category !== "undefined") {
    $("#productGridTitle").html(`Product(s) for ${category.name}`);
  }
}
