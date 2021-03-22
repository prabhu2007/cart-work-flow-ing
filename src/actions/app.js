import { fetchCategoriesIfNeeded } from './cart.js';

export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const RECEIVE_LAZY_RESOURCES = 'RECEIVE_LAZY_RESOURCES';

export const reloadCategory = () => async (dispatch, getState) => {
  let state = getState();
  const page = state.app.page;
  if (['list', 'detail'].indexOf(page) === -1) {
    return;
  }

  dispatch({
    type: UPDATE_LOCATION,
    page: '404',
  });
};

export const updateLocation = (location) => async (dispatch, getState) => {
  const path = window.decodeURIComponent(location.pathname);
  const splitPath = (path || '').slice(1).split('/');
  let page = splitPath[0];
  await dispatch(fetchCategoriesIfNeeded());
  switch (page) {
    case '':
    case 'cart':
      page = 'cart';
      await import('../components/shop-cart.js');
      break;
    default:
      page = '404';
  }

  dispatch({
    type: UPDATE_LOCATION,
    page,
  });

  await dispatch(reloadCategory());

  const lazyLoadComplete = getState().app.lazyResourcesLoaded;
  // load lazy resources after render and set `lazyLoadComplete` when done.
  if (!lazyLoadComplete) {
    requestAnimationFrame(async () => {
      await import('../components/lazy-resources.js');
      dispatch({
        type: RECEIVE_LAZY_RESOURCES,
      });
    });
  }
};
