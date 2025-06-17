// import { loginFailure, loginStart, loginSuccess } from "./userRedux";
// import { publicRequest } from "../requestMethod";

// export const login = async (dispatch, user) => {
//   dispatch(loginStart());
//   try {
//     // 1. User authentication
//     const res = await publicRequest.post("/auth/login", user);
//     const loggedInUser = res.data;
//     dispatch(loginSuccess(loggedInUser));

//     try {
//       // 2. Fetch user's cart from database
//       const dbCartRes = await publicRequest.get(`/cart/${loggedInUser._id}`);
      
//       // Handle different response statuses
//       if (dbCartRes.status === 404) {
//         // Cart doesn't exist yet - create new empty cart
//         await publicRequest.post("/cart", { userId: loggedInUser._id });
//         dispatch(setCart({ products: [], total: 0 }));
//       } else if (!dbCartRes.data) {
//         throw new Error("Invalid cart data received from server");
//       }

//       const dbCart = dbCartRes.data || { products: [], total: 0 };

//       // 3. Get local cart with validation
//       let localCart = [];
//       try {
//         const storedCart = localStorage.getItem("cart");
//         if (storedCart) {
//           localCart = JSON.parse(storedCart);
//           if (!Array.isArray(localCart)) {
//             console.warn("Local cart is not an array");
//             localCart = [];
//           }
//         }
//       } catch (e) {
//         console.error("Local cart parse error:", e);
//         localCart = [];
//       }

//       // 4. Merge strategy
//       const mergedProducts = [...dbCart.products];
//       let mergeConflicts = 0;

//       localCart.forEach(localItem => {
//         if (!localItem?._id || typeof localItem?.price !== 'number' || typeof localItem?.quantity !== 'number') {
//           console.warn("Invalid local cart item skipped:", localItem);
//           return;
//         }

//         const existingIndex = mergedProducts.findIndex(dbItem => dbItem._id === localItem._id);
        
//         if (existingIndex === -1) {
//           mergedProducts.push(localItem);
//         } else {
//           // Conflict resolution - keeping the DB version by default
//           mergeConflicts++;
//         }
//       });

//       if (mergeConflicts > 0) {
//         console.log(`Resolved ${mergeConflicts} cart item conflicts by keeping server versions`);
//       }

//       // 5. Calculate total price
//       const calculatedTotal = mergedProducts.reduce(
//         (sum, item) => sum + (item.price * item.quantity),
//         0
//       );

//       // 6. Update server cart if there were local items
//       if (localCart.length > 0) {
//         try {
//           await publicRequest.patch(`/cart/${loggedInUser._id}`, {
//             products: mergedProducts,
//             total: calculatedTotal
//           });
//         } catch (updateError) {
//           console.error("Failed to update server cart:", updateError);
//           // Continue with local merge even if server update fails
//         }
//       }

//       // 7. Update Redux store
//       dispatch(setCart({
//         products: mergedProducts,
//         total: calculatedTotal
//       }));

//       // 8. Cleanup localStorage
//       try {
//         localStorage.removeItem("cart");
//       } catch (e) {
//         console.error("Failed to clear local cart:", e);
//       }

//     } catch (cartError) {
//       console.error("Cart processing error:", cartError);
//       // Initialize empty cart in Redux if there were errors
//       dispatch(setCart({ products: [], total: 0 }));
      
//       // Optionally show user-friendly error message
//       // dispatch(setCartError("Couldn't load your cart. Showing empty cart."));
//     }

//   } catch (authError) {
//     dispatch(loginFailure());
//     console.error("Login failed:", authError);
//     throw authError;
//   }
// };



// 1
// import { publicRequest } from "../requestMethod";
// import { loginFailure, loginStart, loginSuccess } from "./userRedux"

// export const login = async (dispatch, user) => {
//     dispatch(loginStart());
//     try {
//         const res = await publicRequest.post("/auth/login", user);
//         dispatch(loginSuccess(res.data));
//     } catch (err) {
//         dispatch(loginFailure());
//     }
// }

// 2
import { publicRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
}