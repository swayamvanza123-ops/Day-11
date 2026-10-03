/* =====================================
   UTILITY MODULE
===================================== */


/* =====================================
   TOTAL STOCK
===================================== */

export const calculateTotalStock =
    (products) => {

        return products.reduce(
            (total, product) =>
                total + Number(product.stock),
            0
        );

    };


/* =====================================
   INVENTORY VALUE
===================================== */

export const calculateInventoryValue =
    (products) => {

        return products.reduce(
            (total, product) =>
                total +
                Number(product.price) *
                Number(product.stock),
            0
        );

    };


/* =====================================
   LOW STOCK
===================================== */

export const getLowStockProducts =
    (products) => {

        return products.filter(
            product =>
                Number(product.stock) < 10
        );

    };


/* =====================================
   PRODUCT STATUS
===================================== */

export const getProductStatus =
    (stock) => {

        return Number(stock) < 10
            ? "Low Stock"
            : "Available";

    };


/* =====================================
   RUPEE FORMAT
===================================== */

export const formatRupees =
    (amount) => {

        return `₹${Number(amount)
            .toLocaleString("en-IN")}`;

    };


/* =====================================
   SEARCH
===================================== */

export const searchProducts =
    (products, searchText) => {

        const text =
            searchText
                .toLowerCase()
                .trim();


        if (!text) {

            return products;

        }


        return products.filter(product =>

            product.name
                .toLowerCase()
                .includes(text)

            ||

            product.category
                .toLowerCase()
                .includes(text)

        );

    };


/* =====================================
   FILTER
===================================== */

export const filterProducts =
    (products, filter) => {

        if (filter === "available") {

            return products.filter(
                product =>
                    Number(product.stock) >= 10
            );

        }


        if (filter === "low") {

            return products.filter(
                product =>
                    Number(product.stock) < 10
            );

        }


        return products;

    };