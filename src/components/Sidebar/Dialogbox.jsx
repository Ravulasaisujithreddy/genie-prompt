import React, { useEffect } from 'react'
import './Dialogbox.css'
function Dialogbox({theme,setTheme}) {
  const lightThemeLink = document.getElementById("light-theme");
  const darkThemeLink = document.getElementById("dark-theme");
  const handleTheme = () => {
    const val = theme === "Dark" ? false : true;
    setTheme(val ? "Dark" : "Light");
    document.body.classList.toggle("dark-theme", val);
    
  };
    useEffect(()=>{
      if (theme === "Dark") {
        darkThemeLink.disabled = false;
        lightThemeLink.disabled = true;
      } else {
        darkThemeLink.disabled = true;
        lightThemeLink.disabled = false;
      }
      //console.log(`Theme is :${theme}`)
    },[theme])
   

  return (
    <div className='dialog'>
      <p className='btn'>Extension</p>
      <p className='btn'>Your Public links</p>
      <p className='btn' onClick={handleTheme}>{theme==="Light"?"Switch to Dark":"Switch to Light"}</p>
    </div>
  )
}

export default Dialogbox
