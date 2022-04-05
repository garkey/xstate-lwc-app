export const once = (fn) => {
    let called = false;
    let result;
    return (...args) => {
        if (!called) {
            result = fn(...args);
            called = true;
        }
        return result;
    };
};

export const derivedCamsFields = (o) => ({
    ...o,
    id: o.id || o._id,
    _product: {
        model_number: o.model_number,
        description: o.description,
        model_manufacturer_name: o.model_manufacturer_name,
    },
});
