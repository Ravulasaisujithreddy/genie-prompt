import React, { useContext, useRef, useState ,useEffect} from 'react'
import "./Main.css"
import { assets } from '../../assets/assets'
import { dataContext } from '../../Context/Context'
import Genie from '../Genie/genie'

function Main() {
  
  const {data,fetchData,input,setInput,sent,setSent,prompt,setPrompt,geminiLoading,setgeneLoading,setgeminiLoading,setgenieMode,setgeminiMode,setGenieData,setData,theme}=useContext(dataContext)
  const inputRef=useRef(null)
  
  const handleInput=(e)=>{
        setInput(e.target.value)
       
  }
  useEffect(() => {
  const textarea = inputRef.current;
  const parent = textarea.parentNode;

  // Reset height to calculate the new height dynamically
  textarea.style.height = 'auto'; 
  parent.style.height = 'auto';

  // Set the height based on the content, up to a maximum of 150px
  const newHeight = Math.min(textarea.scrollHeight, 150);
  textarea.style.height = `${newHeight}px`;
  parent.style.height = `${newHeight}px`;
}, [input]);

  const handleSend=()=>{
       setgenieMode(false)
       setgeminiMode(true)
       setgeminiLoading(true)
       setgeneLoading(true)
       setSent(true);

       fetchData(input).then(res=>{
         setData(res);
         setgeminiLoading(false);})
       
        
       
       setPrompt(input);
       
       inputRef.current.value="";
       setInput("");
       
      
  }
  const handleCard=(e)=>{
   console.log(e.currentTarget.querySelector("p").textContent)
   setInput(e.currentTarget.querySelector("p").textContent)
  }

  const handleGenie=()=>{
    setSent(false)
    setgeneLoading(true)
    setgenieMode(true);
    setgeminiMode(false)
    fetchData(`Generate a short and engaging prompt for: ${input}. Make it clear, effective, and aligned . Ensure the response is structured as a prompt always, not a solution.`).then((res)=>{
      setGenieData(res)
      setgeneLoading(false)
    })
    
    
    inputRef.current.value="";
       setInput("");
  }
 
  return (
    <div className='main'>
      {/* <div className="nav">
        
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div> */}
      <div className="main-container">
        <Genie ></Genie>
        {/* {!sent && <div className="greet">
          <p><span>Hello,Dev.</span></p>
          <p>How can i help you today?</p>
        </div>} */}
        {!sent && <div className="cards">
          <div className="card" onClick={handleCard}>
            <p>Suggest beautiful places to see on an upcoming road trip</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card" onClick={handleCard}>
            <p>Briefly summerize this concept :urban planning</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card" onClick={handleCard}> 
            <p>How to decorate an office space to look cozier yet professional?</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card" onClick={handleCard}>
            <p>Write a program to print Hello World</p>
            <img src={assets.code_icon} alt="" />
          </div>
        
        </div>}
        {sent && <div className="result">
						<div className="result-title">
							<img src={assets.user} alt="" />
							<p>{prompt}</p>
						</div>
						<div className="result-data">
							<img src={assets.gemini_icon} alt="" />
							{geminiLoading ? (
								<div className="loader">
									<hr />
									<hr />
									<hr />
								</div>
							) : (
								<p className="markdown-body" dangerouslySetInnerHTML={{ __html: data } }></p>
							)}
						</div>
					</div>}
        <div className="main-bottom">
          <div className="search-box">
            <div>
              
              <img src={assets.genie_lamp} alt="genie_lamp" onClick={handleGenie} />
              <p>Ask Genie</p>
              </div>
            <textarea ref={inputRef} type="text" placeholder='Enter a Prompt here' onInput={handleInput} value={input}/>
            <div>
              
              <img src={assets.send_icon} alt="" onClick={handleSend} />
              <p>Ask Gemini</p>
            </div>
          </div>
          <p className="bottom-info">
          Ask Genie to generate a prompt, then ask Gemini for the result. Feel free to modify the prompts as needed, and keep in mind that they may not always be entirely accurate.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
