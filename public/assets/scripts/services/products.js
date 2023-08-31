export async function addProduct(data) {

}

// gets and return a list of product
export async function getProducts() {
  const products = await axios.get("/api/products")

  return products
}

export async function getProduct(id) {

}

export async function updateProduct(id) {

}

export async function deleteProduct(id) {

}