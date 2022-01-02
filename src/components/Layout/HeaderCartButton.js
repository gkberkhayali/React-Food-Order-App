import React,{useContext,useEffect,useState} from 'react';
import CartIcon  from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context'


const HeaderCartButton = (props) => {
    
    const [ButtonIsHighlighted,SetButtonIsHighlighted] = useState(false);
    
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce( (curNumber,item) => {
        return curNumber + item.amount;
    } , 0 );
    
    const btnClasses = `${classes.button} ${ ButtonIsHighlighted ? classes.bump : ''}`;

    useEffect ( ()=> {
        if(cartCtx.items.lenght === 0)
        {
            return;
        }

       SetButtonIsHighlighted(true);

       const timer = setTimeout(() => {
           SetButtonIsHighlighted(false);
       }, 300);

       return () =>
       {
           clearTimeout(timer);
       };

    },[cartCtx.items]);


    return (
        <button className={btnClasses} onClick = {props.onClick}>
            <span className={classes.icon}>
                <CartIcon></CartIcon>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}> {numberOfCartItems} </span>
        </button>
    );

};

export default HeaderCartButton;