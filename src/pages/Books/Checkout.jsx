import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContex";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import Swal from 'sweetalert2';
import { clearCart } from "../../redux/features/cart/cartSlice";

const Checkout = () => {
    const { currentUser } = useAuth();
    const [isChecked, setIscheked] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.newPrice * item.quantity), 0).toFixed(2);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser.email,
            phone: data.phone,
            address: {
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
                city: data.city,
                landmark: data.address,
            },
            products: cartItems.map(item => ({ productId: item?._id, quantity: item.quantity })),
            totalPrice,
        }
        console.log(newOrder);

        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Confirmed Order",
                text: "Your order placed successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
            });
            dispatch(clearCart())
            navigate("/orders");
        } catch (error) {
            console.error("Error place an order", error);
            alert("Failed to place an order");
        }
    };
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div>
                    {/* Heading and Cart Summary */}
                    <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
                    <p className="text-gray-500 mb-2">Total Price: ₹{totalPrice}</p>
                    <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>

                    {/* Form Section */}
                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            {/* Personal Details */}
                            <div className="text-gray-600 mb-4">
                                <p className="font-medium text-lg">Personal Details</p>
                                <p>Please fill out all the fields.</p>
                            </div>

                            <div className="grid gap-4 text-sm grid-cols-1 md:grid-cols-5">
                                {/* Full Name */}
                                <div className="md:col-span-5">
                                    <label htmlFor="full_name">Full Name</label>
                                    <input
                                        {...register("name", { required: true })}
                                        type="text" name="name" id="name" className="h-10 focus:outline-none border mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">Full name is required.</p>}
                                </div>

                                {/* Email Address (Disabled) */}
                                <div className="md:col-span-5">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        {...register("email")}
                                        type="text" name="email" id="email" className="h-10 focus:outline-none border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400 font-semibold"
                                        disabled
                                        defaultValue={currentUser?.email}
                                        placeholder="email@domain.com"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="md:col-span-5">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        {...register("phone", { required: true })}
                                        type="tel" name="phone" id="phone" className="h-10 border focus:outline-none mt-1 rounded px-4 w-full bg-gray-50" placeholder="+123 456 7890"
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">Phone number is required.</p>}
                                </div>

                                {/* Address */}
                                <div className="md:col-span-3">
                                    <label htmlFor="address">Address / Street</label>
                                    <input
                                        {...register("address", { required: true })}
                                        type="text" name="address" id="address" className="h-10 focus:outline-none border mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                    {errors.address && <p className="text-red-500 text-xs mt-1">Address is required.</p>}
                                </div>

                                {/* City */}
                                <div className="md:col-span-2">
                                    <label htmlFor="city">City</label>
                                    <input
                                        {...register("city", { required: true })}
                                        type="text" name="city" id="city" className="h-10 focus:outline-none border mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                    {errors.city && <p className="text-red-500 text-xs mt-1">City is required.</p>}
                                </div>

                                {/* Country */}
                                <div className="md:col-span-2">
                                    <label htmlFor="country">Country / Region</label>
                                    <input
                                        {...register("country", { required: true })}
                                        type="text" name="country" id="country" className="h-10 focus:outline-none border mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                    {errors.country && <p className="text-red-500 text-xs mt-1">Country is required.</p>}
                                </div>

                                {/* State / Province */}
                                <div className="md:col-span-2">
                                    <label htmlFor="state">State / Province</label>
                                    <input
                                        {...register("state", { required: true })}
                                        type="text" name="state" id="state" className="h-10 focus:outline-none border mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                    {errors.state && <p className="text-red-500 text-xs mt-1">State is required.</p>}
                                </div>

                                {/* Zipcode */}
                                <div className="md:col-span-1">
                                    <label htmlFor="zipcode">Zipcode</label>
                                    <input
                                        {...register("zipcode", { required: true })}
                                        type="text" name="zipcode" id="zipcode" className="h-10 focus:outline-none border mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                    {errors.zipcode && <p className="text-red-500 text-xs mt-1">Zipcode is required.</p>}
                                </div>

                                {/* Terms & Conditions Checkbox */}
                                <div className="md:col-span-5 mt-3">
                                    <div className="inline-flex items-center">
                                        <input
                                            onChange={(e) => setIscheked(e.target.checked)}
                                            type="checkbox" name="billing_same" id="billing_same" className="form-checkbox"
                                        />
                                        <label htmlFor="billing_same" className="ml-2">I agree to the <Link className='underline text-blue-600'>Terms & Conditions</Link> and <Link className='underline text-blue-600'>Shopping Policy</Link>.</label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="md:col-span-5 text-right">
                                    <button
                                        type="submit"
                                        disabled={!isChecked}
                                        className={`bg-blue-500 ${isChecked ? 'hover:bg-blue-700 hover:shadow-blue-400 hover:shadow-md' : 'cursor-not-allowed opacity-50'} text-white font-bold py-2 px-4 rounded`}
                                    >
                                        Place an Order
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
