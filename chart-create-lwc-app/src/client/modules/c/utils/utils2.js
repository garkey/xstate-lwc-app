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

export const product_entity = [
  'model_number',
  'description',
  'model_manufacturer_name',
];

export const calibrationInterval_entity = [
  'calibrationInterval',
  'calibrationIntervalUnits',
];


export const derivedCamsFields = (o) => ({
  ...o,
  _id: o._id || o.id,
  id: o.id || o._id,
  _product: product_entity.map((e) => o[e]).join('<br>'),
  _calibrationInterval: calibrationInterval_entity.map((e) => o[e]).join(' '),
  _model_oemCalibration: o.model_oemCalibrationInterval
      ? `${o.model_oemCalibrationInterval} ${o.model_oemCalibrationIntervalUnits}`
      : '',
});
