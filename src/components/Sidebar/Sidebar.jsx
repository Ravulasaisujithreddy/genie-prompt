import React ,{useContext, useEffect, useState,useRef}from 'react'
import { assets } from '../../assets/assets'
import "./Sidebar.css"
import { dataContext } from '../../Context/Context'
import Dialogbox from './Dialogbox'
function Sidebar() {
  const {allPrompts,setInput,setSent,theme,setTheme}=useContext(dataContext)
  const [extended,setExtended]=useState(false)
  const [showSettings,setShowSettings]=useState(false)
  const dialogRef=useRef(null)
  const handleChat=(index)=>{
        setInput(allPrompts[index])
  }
  const handleNew=()=>{
       setSent(false)
       setInput("")
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click target is outside the dialog box
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setShowSettings(false); // Close the settings dialog
      }
    };

    // Add event listener to detect clicks outside
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='sidebar'>
      <div className='top'>
        <img className="menu" src={assets.menu_icon} alt="" onClick={()=>setExtended(prev=>!prev)}/>
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended?<p onClick={handleNew}>New Chat</p>:null}
        </div>
        {extended?
        <div className="recent">
          <p className="recent-title">
            Recent
          </p>
          {allPrompts.map((val,index)=>{ 
            if(val)
            return <div className="recent-entry" key={index} onClick={()=>handleChat(index)}>
            <img src={assets.message_icon} alt="" />
            <p>{val.slice(0,15)}</p>
          </div>})}
        </div>:null}
      </div> 
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended?<p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended?<p>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry settings" ref={dialogRef}>
          <img src={assets.setting_icon} alt="" />
          {extended?<><p onClick={()=>{
            setShowSettings(prev=>!prev)
            }}>Settings</p>
          {showSettings&&<div ><Dialogbox setTheme={setTheme} theme={theme}/></div>}</>:null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
