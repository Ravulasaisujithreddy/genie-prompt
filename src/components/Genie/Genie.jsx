import React, { useContext, useEffect } from 'react'
import './genie.css'
import Lottie from 'lottie-react'
import animationData from '../../assets/Animation.json'
import loadingAnimation from '../../assets/Genie_writing.json'
import { dataContext } from '../../Context/Context'

function Genie() {
    const {genieData,geneloading,setInput}=useContext(dataContext)
 
   const hanldePrompt=()=>{
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = genieData;
    const textContent = tempDiv.innerText || tempDiv.textContent;
    setInput(textContent)
    }
    useEffect(()=>{
        console.log(geneloading)
        console.log(genieData)
    },[geneloading,genieData])
  return (
    <div className='genie-dialog'>
      <p className="textbox" dangerouslySetInnerHTML={{ __html:geneloading?"":genieData}} readOnly></p>
      
    {geneloading &&<Lottie animationData={animationData} className='lottie'/>}
    {!geneloading && <p className="btn" onClick={hanldePrompt}>Use as prompt</p>}
    </div>
  )
}

export default Genie
