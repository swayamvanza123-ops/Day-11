/* =====================================
   PRODUCTS MODULE
===================================== */


/* DEFAULT PRODUCTS */

export const defaultProducts = [

    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 50000,
        stock: 20
    },

    {
        id: 2,
        name: "Mouse",
        category: "Accessories",
        price: 800,
        stock: 50
    },

    {
        id: 3,
        name: "Keyboard",
        category: "Accessories",
        price: 1500,
        stock: 35
    },

    {
        id: 4,
        name: "Monitor",
        category: "Electronics",
        price: 12000,
        stock: 10
    },

    {
        id: 5,
        name: "Printer",
        category: "Electronics",
        price: 15000,
        stock: 5
    },

    {
        id: 6,
        name: "Headphones",
        category: "Accessories",
        price: 2500,
        stock: 25
    },

    {
        id: 7,
        name: "Webcam",
        category: "Electronics",
        price: 3500,
        stock: 7
    },

    {
        id: 8,
        name: "USB Cable",
        category: "Accessories",
        price: 500,
        stock: 60
    }

];


/* =====================================
   ADD PRODUCT
===================================== */

export const addProduct =
    (products, product) => {

        return [
            ...products,
            product
        ];

    };


/* =====================================
   UPDATE PRODUCT
===================================== */

export const updateProduct =
    (products, updatedProduct) => {

        return products.map(product =>

            product.id === updatedProduct.id
                ? updatedProduct
                : product

        );

    };


/* =====================================
   DELETE PRODUCT
===================================== */

export const deleteProduct =
    (products, productId) => {

        return products.filter(
            product =>
                product.id !== productId
        );

    };