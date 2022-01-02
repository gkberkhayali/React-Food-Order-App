import React,{useReducer} from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items:[],
    totalAmount:0
}

const cartReducer = (previousState,action) => {

    if(action.type === 'ADD')
    {
        const existingCartItemIndex = previousState.items.findIndex  (item => item.id === action.item.id);
        const existingCartItem = previousState.items[existingCartItemIndex];
        const updatedTotalAmount = previousState.totalAmount + action.item.price * action.item.amount;

        let updatedItems;

        if(existingCartItem)
        {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...previousState.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else
        {
            updatedItems = previousState.items.concat (action.item);
        }

        return {
            items:updatedItems,
            totalAmount : updatedTotalAmount
        }
    }

    if(action.type === 'REMOVE')
    {
        const existingCartItemIndex = previousState.items.findIndex(item => item.id === action.id);
        const existingItem = previousState.items[existingCartItemIndex];
        const updatedTotalAmount = previousState.totalAmount - existingItem.price;
        let updatedItems;

        if(existingItem.amount === 1)
        {   
            updatedItems = previousState.items.filter( item => item.id !== action.id);
        }
        else
        {
            const updatedItem = {...existingItem, amount : existingItem.amount -1};
            updatedItems = [...previousState.items];
            updatedItems[existingCartItemIndex] = updatedItem;
         }
       
         return {
             items:updatedItems,
             totalAmount : updatedTotalAmount
         }

    }


    return defaultCartState;
};



const CartProvider = (props) => {

    const [cartState, dispatchCartAction] =  useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type:'ADD',
            item : item,
        });
    };
    
    const removeItemToCartHandler = (id) => {
           dispatchCartAction({
            type:'REMOVE',
            id : id,
        });
    };
    

    const cartContext = {
        items:cartState.items,
        totalAmount : cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem : removeItemToCartHandler
    };

    return (
        <CartContext.Provider value = {cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;