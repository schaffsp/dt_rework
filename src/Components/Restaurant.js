import React from 'react'

const Restaurant = (props) => {
    const {restaurant} = props;

    return (
        <div>
            <h2>{restaurant.name}</h2>
        </div>
    )
}

export default Restaurant
