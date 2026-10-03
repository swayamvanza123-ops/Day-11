/* =====================================
   MAIN MODULE
===================================== */

import {
    defaultProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from "./products.js";


import {
    saveProducts,
    getProducts
} from "./storage.js";


import {
    calculateTotalStock,
    calculateInventoryValue,
    getLowStockProducts,
    getProductStatus,
    formatRupees,
    searchProducts,
    filterProducts
} from "./utils.js";


/* =====================================
   PRODUCTS
===================================== */

let products = getProducts();


if (products.length === 0) {

    products = [...defaultProducts];

    saveProducts(products);

}


/* =====================================
   DOM ELEMENTS
===================================== */

const productTableBody =
    document.getElementById("productTableBody");

const emptyMessage =
    document.getElementById("emptyMessage");

const totalProducts =
    document.getElementById("totalProducts");

const totalStock =
    document.getElementById("totalStock");

const lowStock =
    document.getElementById("lowStock");

const inventoryValue =
    document.getElementById("inventoryValue");

const searchInput =
    document.getElementById("searchInput");

const filterSelect =
    document.getElementById("filterSelect");

const clearFilters =
    document.getElementById("clearFilters");

const newProductBtn =
    document.getElementById("newProductBtn");

const productModal =
    document.getElementById("productModal");

const closeModal =
    document.getElementById("closeModal");

const cancelBtn =
    document.getElementById("cancelBtn");

const productForm =
    document.getElementById("productForm");

const modalTitle =
    document.getElementById("modalTitle");

const productId =
    document.getElementById("productId");

const productName =
    document.getElementById("productName");

const productCategory =
    document.getElementById("productCategory");

const productPrice =
    document.getElementById("productPrice");

const productStock =
    document.getElementById("productStock");

const electronicsCount =
    document.getElementById("electronicsCount");

const accessoriesCount =
    document.getElementById("accessoriesCount");

const categoryCards =
    document.querySelectorAll(".category-card");


/* =====================================
   DISPLAY PRODUCTS
===================================== */

const displayProducts = (productList) => {

    productTableBody.innerHTML = "";


    if (productList.length === 0) {

        emptyMessage.style.display = "block";

        return;

    }


    emptyMessage.style.display = "none";


    productList.forEach(product => {

        const status =
            getProductStatus(product.stock);


        const statusClass =
            status === "Low Stock"
                ? "low"
                : "available";


        productTableBody.innerHTML += `

            <tr>

                <td>

                    <div class="product-name">
                        ${product.name}
                    </div>

                    <div class="product-id">
                        Product ID #${product.id}
                    </div>

                </td>


                <td>
                    ${product.category}
                </td>


                <td>
                    ${formatRupees(product.price)}
                </td>


                <td>
                    ${product.stock}
                </td>


                <td>

                    <span
                        class="status ${statusClass}">

                        ${status}

                    </span>

                </td>


                <td>

                    <button
                        class="action-btn"
                        onclick="
                            window.editProduct(${product.id})
                        ">

                        ✏️

                    </button>


                    <button
                        class="action-btn delete-btn"
                        onclick="
                            window.removeProduct(${product.id})
                        ">

                        🗑️

                    </button>

                </td>

            </tr>

        `;

    });

};


/* =====================================
   UPDATE DASHBOARD
===================================== */

const updateDashboard = () => {

    const stock =
        calculateTotalStock(products);


    const low =
        getLowStockProducts(products).length;


    const value =
        calculateInventoryValue(products);


    totalProducts.textContent =
        products.length;


    totalStock.textContent =
        stock;


    lowStock.textContent =
        low;


    inventoryValue.textContent =
        formatRupees(value);


    /* CATEGORY COUNTS */

    const electronics =
        products.filter(
            product =>
                product.category === "Electronics"
        ).length;


    const accessories =
        products.filter(
            product =>
                product.category === "Accessories"
        ).length;


    electronicsCount.textContent =
        `${electronics} Products`;


    accessoriesCount.textContent =
        `${accessories} Products`;

};


/* =====================================
   RENDER
===================================== */

const render = () => {

    const searched =
        searchProducts(
            products,
            searchInput.value
        );


    const filtered =
        filterProducts(
            searched,
            filterSelect.value
        );


    displayProducts(filtered);

    updateDashboard();

};


/* =====================================
   ADD MODAL
===================================== */

const openAddModal = () => {

    productForm.reset();

    productId.value = "";

    modalTitle.textContent =
        "Add New Product";

    productModal.classList.add(
        "show"
    );

};


/* =====================================
   CLOSE MODAL
===================================== */

const closeProductModal = () => {

    productModal.classList.remove(
        "show"
    );

    productForm.reset();

};


/* =====================================
   ADD / UPDATE PRODUCT
===================================== */

productForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const name =
            productName.value.trim();


        const category =
            productCategory.value;


        const price =
            Number(productPrice.value);


        const stock =
            Number(productStock.value);


        if (!name) {

            alert(
                "Please enter product name."
            );

            return;

        }


        if (!category) {

            alert(
                "Please select a category."
            );

            return;

        }


        if (price <= 0) {

            alert(
                "Price must be greater than 0."
            );

            return;

        }


        if (stock < 0) {

            alert(
                "Stock cannot be negative."
            );

            return;

        }


        /* EDIT */

        if (productId.value) {

            const updatedProduct = {

                id:
                    Number(productId.value),

                name,

                category,

                price,

                stock

            };


            products =
                updateProduct(
                    products,
                    updatedProduct
                );

        }


        /* ADD */

        else {

            const newProduct = {

                id: Date.now(),

                name,

                category,

                price,

                stock

            };


            products =
                addProduct(
                    products,
                    newProduct
                );

        }


        saveProducts(products);

        render();

        closeProductModal();

    }
);


/* =====================================
   EDIT PRODUCT
===================================== */

const editProduct = (id) => {

    const product =
        products.find(
            product =>
                product.id === id
        );


    if (!product) {

        return;

    }


    productId.value =
        product.id;


    productName.value =
        product.name;


    productCategory.value =
        product.category;


    productPrice.value =
        product.price;


    productStock.value =
        product.stock;


    modalTitle.textContent =
        "Edit Product";


    productModal.classList.add(
        "show"
    );

};


/* =====================================
   DELETE PRODUCT
===================================== */

const removeProduct = (id) => {

    const product =
        products.find(
            product =>
                product.id === id
        );


    if (!product) {

        return;

    }


    const confirmed =
        confirm(
            `Are you sure you want to delete ${product.name}?`
        );


    if (!confirmed) {

        return;

    }


    products =
        deleteProduct(
            products,
            id
        );


    saveProducts(products);

    render();

};


/* =====================================
   SEARCH
===================================== */

searchInput.addEventListener(
    "input",
    render
);


/* =====================================
   FILTER
===================================== */

filterSelect.addEventListener(
    "change",
    render
);


/* =====================================
   RESET
===================================== */

clearFilters.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        filterSelect.value = "all";

        render();

    }
);


/* =====================================
   NEW PRODUCT
===================================== */

newProductBtn.addEventListener(
    "click",
    openAddModal
);


/* =====================================
   CLOSE MODAL
===================================== */

closeModal.addEventListener(
    "click",
    closeProductModal
);


cancelBtn.addEventListener(
    "click",
    closeProductModal
);


/* =====================================
   OUTSIDE MODAL
===================================== */

productModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            productModal
        ) {

            closeProductModal();

        }

    }
);


/* =====================================
   CATEGORY CLICK
===================================== */

categoryCards.forEach(
    card => {

        card.addEventListener(
            "click",
            () => {

                const category =
                    card.dataset.category;


                /*
                    Put category in search.
                    Products are automatically
                    filtered by category.
                */

                searchInput.value =
                    category;


                filterSelect.value =
                    "all";


                document
                    .getElementById("products")
                    .scrollIntoView({
                        behavior: "smooth"
                    });


                render();

            }
        );

    }
);


/* =====================================
   SIDEBAR NAVIGATION
===================================== */

document
    .getElementById("dashboardNav")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("dashboard")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


document
    .getElementById("productsNav")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("products")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


document
    .getElementById("categoriesNav")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("categories")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


document
    .getElementById("vendorsNav")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("vendors")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* =====================================
   GLOBAL FUNCTIONS
===================================== */

window.editProduct =
    editProduct;


window.removeProduct =
    removeProduct;


/* =====================================
   INITIAL LOAD
===================================== */

render();