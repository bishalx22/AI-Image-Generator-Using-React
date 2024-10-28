import React, { useState, useRef } from 'react';
import './ImageGenerator.css';
import image from '../Assets/default_image.svg';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    const inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return; 
        }
    
        try {
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer YOUR_API_KEY",
                },
                body: JSON.stringify({
                    prompt: inputRef.current.value,
                    n: 1,
                    size: "512x512",
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error.message}`); 
            }
    
            const data = await response.json();
            console.log(data);
    
            if (data.data && Array.isArray(data.data) && data.data.length > 0) {
                setImage_url(data.data[0].url); 
            } else {
                console.error("No image data found in response:", data);
                setImage_url(image);
            }
        } catch (error) {
            console.error('Error generating image:', error); 
            setImage_url(image); 
        }
    };

    return (
        <div className="AI-Image_generator">
            <div className="header">AI Image <span>Generator</span></div>
            <div className="img-loading">
                <div className="image"><img src={image_url === "/" ? image : image_url} alt="Generated" /></div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe What you want to see' />
                <div className="generate-btn" onClick={imageGenerator}>Generate</div>
            </div>
        </div>
    );
};

export default ImageGenerator;

