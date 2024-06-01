import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'

export const ImageGenerator = () => {

  const [image_url , setimage_url] = useState('/');
  let inputRef = useRef(null); 
  const [Loading , setLoading] = useState(false);

  const imageGenerator = async () => {
      if(inputRef.current.value === ""){
        return 0;
      }

      setLoading(true);
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
             "Content-Type" : "application/json",
             Authorization: "Bearer //use your API Key",
             "User-Agent" : "Chrome",

          },
            body:JSON.stringify({
              prompt: `${inputRef.current.value}`,
              size : "512x512",
            }),    
        }
      );

       let data = await response.json();
       let data_array = data.data;
       setimage_url(data_array[0].url);
       setLoading(false);
  }

  return (
    <div className='ai-image-generator'>
        <div className="header">AI Image <span>Generator</span></div>
        <div className="image-loading">
            <div className="image"><img src= {image_url === "/" ? default_image : image_url} alt="" /></div>
            <div className="Loading">
              <div className={Loading ? "loading-bar-full" : "loading-full"}></div>
              <div className={Loading? "loading-text" : "display-none"}>Loading.....</div>
            </div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See'/>
            <div className="generate-btn" onClick={() => {imageGenerator()}}>Generate</div>
        </div>
    </div>
  )
}

export default ImageGenerator
