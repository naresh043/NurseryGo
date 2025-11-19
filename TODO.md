# TODO: Fix Compilation Errors

## Step 1: Add category state and setCategory action to dataSlice.js

- [x] Add `category: null` to initialState
- [x] Add `setCategory` reducer
- [x] Export `setCategory` in the actions

## Step 2: Replace contexts imports with Redux in components and pages

- [x] src/components/Occasional/Occasional.jsx: Replace useData with useSelector and useDispatch
- [x] src/components/ProductCard/ProductCard.jsx: Replace useData with useSelector and useDispatch
- [x] src/components/SingleProduct/SingleProduct.jsx: Replace useData with useSelector and useDispatch
- [x] src/hooks/userActions.jsx: Replace useData with useSelector and useDispatch
- [x] src/pages/cart-page/Cart.jsx: Replace useData with useSelector and useDispatch
- [x] src/pages/checkout-page/checkout.jsx: Replace useData with useSelector and useDispatch
- [x] src/pages/home-page/Homepage.jsx: Replace useData with useSelector and useDispatch
- [x] src/pages/order-summery/ordersummery.jsx: Replace useData with useSelector and useDispatch
- [x] src/pages/product-page/Productlist.jsx: Replace useData with useSelector and useDispatch
- [x] src/pages/profile-page/Profile.jsx: Replace useAuth and useData with useSelector and useDispatch
- [x] src/pages/single-product-page/Singleproduct.jsx: Replace useData with useSelector and useDispatch
- [x] src/pages/wishlist-page/Wishlist.jsx: Replace useData with useSelector and useDispatch

## Step 3: Verify fixes

- [x] Run npm start to check if errors are resolved
