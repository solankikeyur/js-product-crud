import productForm from "./product-form.js";

const loadContent = () => {
  let fragmentId = location.hash.substring(1);
  getContent(fragmentId, (content) => {
    $("#app").html(content);
  });
};

const getContent = (fragmentId, callback) => {
  let html = ``;
  switch (fragmentId) {
    case "products":
      document.title = "Products";
      html = loadProducts();
      callback(html);
      break;

    case "addProduct":
      document.title = "Add Product";
      productId = null;
      html = productForm;
      callback(html);
      validateProductForm();
      break;

    case "editProduct":
      document.title = "Edit Product";
      html = productForm;
      callback(html);
      validateProductForm();
      fillEditProductForm();
      break;

    case "categories":
      document.title = "Categories";
      html = loadCategoriesGridHtml();
      callback(html);
      break;

    case "categoryProducts":
      document.title = "Category Product(s)";
      html = categoryProductsHtml();
      callback(html);
      setCategoryTitle();
      break;

    default:
      location.hash = "#products";
      break;
  }
};

loadContent();

window.addEventListener("hashchange", loadContent);
