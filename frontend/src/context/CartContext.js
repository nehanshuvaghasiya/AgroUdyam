'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.product._id === action.payload.product._id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product._id === action.payload.product._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.product._id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.product._id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('agroudyam_cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'SET_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('agroudyam_cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('agroudyam_cart', JSON.stringify(state.items));
  }, [state.items]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    try {
      // Validate product
      if (!product || !product._id) {
        throw new Error('Invalid product');
      }

      // Check if product is available
      if (product.quantity < quantity) {
        toast.error(`Only ${product.quantity} items available`);
        return;
      }

      const cartItem = {
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          images: product.images,
          farmer: product.farmer,
          quantity: product.quantity,
        },
        quantity,
        addedAt: new Date().toISOString(),
      };

      dispatch({ type: 'ADD_TO_CART', payload: cartItem });
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    try {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    try {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      // Find the item to check available quantity
      const cartItem = state.items.find(item => item.product._id === productId);
      if (cartItem && quantity > cartItem.product.quantity) {
        toast.error(`Only ${cartItem.product.quantity} items available`);
        return;
      }

      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: { productId, quantity } 
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  // Clear entire cart
  const clearCart = () => {
    try {
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  // Get cart item count
  const getItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Get cart total
  const getTotal = () => {
    return state.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  // Get cart total with shipping
  const getTotalWithShipping = (shippingCost = 0) => {
    return getTotal() + shippingCost;
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return state.items.some(item => item.product._id === productId);
  };

  // Get quantity of specific product in cart
  const getProductQuantity = (productId) => {
    const item = state.items.find(item => item.product._id === productId);
    return item ? item.quantity : 0;
  };

  // Validate cart items (check availability)
  const validateCart = () => {
    const invalidItems = state.items.filter(item => {
      return item.quantity > item.product.quantity;
    });

    if (invalidItems.length > 0) {
      toast.error('Some items in your cart are no longer available');
      return false;
    }

    return true;
  };

  // Get cart summary
  const getCartSummary = () => {
    return {
      itemCount: getItemCount(),
      total: getTotal(),
      items: state.items,
      isEmpty: state.items.length === 0,
    };
  };

  const value = {
    items: state.items,
    loading: state.loading,
    error: state.error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotal,
    getTotalWithShipping,
    isInCart,
    getProductQuantity,
    validateCart,
    getCartSummary,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
