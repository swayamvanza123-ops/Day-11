/* =====================================
   STORAGE MODULE
===================================== */

const STORAGE_KEY = "products";


/* =====================================
   SAVE
===================================== */

export const saveProducts =
    (products) => {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(products)
        );

    };


/* =====================================
   GET
===================================== */

export const getProducts =
    () => {

        const data =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (!data) {

            return [];

        }


        return JSON.parse(data);

    };


/* =====================================
   REMOVE
===================================== */

export const removeProducts =
    () => {

        localStorage.removeItem(
            STORAGE_KEY
        );

    };