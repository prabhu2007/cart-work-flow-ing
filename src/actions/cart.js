export const SET_CART = 'SET_CART';

export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

export const fetchCategoriesIfNeeded = () => (dispatch, getState) => {
  // This can be dispatched async if needed (e.g. after a fetch() request).
  return new Promise((resolve) => {
    return fetch(`data/list_of_items.json`)
      .then((res) => res.json())
      .then((items) => {
        dispatch(setCart(items));
        resolve();
      })
      .catch(() => console.log('Got Error'));
  });
};
