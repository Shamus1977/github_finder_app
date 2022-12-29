import React from 'react';
import spin from "../assets/spinner.gif";

const SpinGif = () => {
    return (
        <div className='w-100 mt-20' >
            <img 
                width={180} 
                className="text-center" 
                alt="Spinner showing that the screen is loading."
                src={spin} 
            />
        </div>
    )
}

export default SpinGif
