export const API = {
    //prosucts
    listProducts:"/products", // GET
    addProduct:"/products", // Post
    updateProduct:(id) => `/products/${id}`, // PUT
    deleteProduct: (id) => `/products/${id}`, // DELETE
}