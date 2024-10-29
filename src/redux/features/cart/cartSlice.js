import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                const newItem = {...action.payload, quantity : 1};
                state.cartItems.push(newItem);
                Swal.fire({
                    icon: "success",
                    position: "center",
                    showConfirmButton: false,
                    title: "Item added!",
                    timer: 1000,
                    customClass: {
                        popup: 'custom-swal',
                    }
                });
            }else {
                Swal.fire({
                    icon: "warning",
                    position: "center",
                    showConfirmButton: false,
                    title: "Already in cart.",
                    timer: 1000,
                    customClass: {
                        popup: 'custom-swal',
                    }
                })
            }
        },
        removeFromCart : (state, action) =>{
            state.cartItems =  state.cartItems.filter(item => item._id !== action.payload);
        },
        clearCart : (state)=>{
            state.cartItems = [];
            
        },
        increaseQuantity :(state,action)=>{
            const existingItem = state.cartItems.find(item => item._id === action.payload);
            if (existingItem.quantity<5){
                existingItem.quantity+=1;
            }
        },
        decreaseQuantity :(state,action)=>{
            const existingItem = state.cartItems.find(item => item._id === action.payload);
            if(existingItem.quantity > 1){
                existingItem.quantity-=1;
            }
        }
    }
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
