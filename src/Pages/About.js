import React from 'react'
import '../CSS/About.css';

const About = () => {
    return (
        <div className='About-Container'>
            <h3 className='About-Header'>How are nearby restaurants found?</h3>
            <p className='About-Text'>&emsp;The website uses the Google Places API to get a list of nearby restaurants. Unfortunately, that API only returns twenty results at one time, so pagination is required to get any meaningful list of restaurants. This is further complicated by a two second delay that Google places after each API call; if you look carefully, roughly two seconds after you search for nearby restaurants, the list displayed below the search bar may appear to jump around or change. This is because another queries has been sent out and supplemented the list, and it must be resorted to remain accurate to the sort priority set by the user. </p>
        </div>
    )
}

export default About
