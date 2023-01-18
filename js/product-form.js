const productForm = () => {
  const categories = getCategories();
  let categoryOptions = ``;
  categories.map((category) => {
    categoryOptions += `<option value="${category.value}">${category.name}</option>`;
  }); 
  return (
    `<form id="productForm" enctype="multipart/form-data">
      <div class="container mt-4">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="productTitle">Product Title</label>
              <input
                type="text"
                name="title"
                id="productTitle"
                class="form-control"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="productPrice">Price</label>
              <input
                type="number"
                step=".01"
                name="price"
                id="productPrice"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <label for="productDescription">Description</label>
              <textarea
                id="productDescription"
                name="description"
                class="form-control"
                rows="5"
                placeholder="Type here"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="productCategory">Category</label>
              <select id="productCategory" name="category" class="form-control">
                <option value="">Choose...</option>
                ${categoryOptions}
              </select>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-12">
            <button type="submit" class="btn btn-primary" id="saveProductBtn">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>`
  );
};

export default productForm;