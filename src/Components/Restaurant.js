import React from 'react'
import '../CSS/Restaurant.css'

const Restaurant = (props) => {
    const {restaurant} = props;

    return (
        <div className='Restaurant-Contianer'>
            <div className='Restaurant-Top-Container'>
                <h3>{restaurant.restaurant_name}</h3>
                <h4 id="address" className='Restaurant-address'>{restaurant.address.street}</h4>
                <h4>0.7mi</h4>
                <h4 className='left'>{restaurant.restaurant_phone}</h4>
            </div>
        </div>
    )
}

export default Restaurant
