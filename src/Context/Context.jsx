import React, {  createContext, useEffect, useState } from 'react'
import run from '../Config/gemini';

import { marked } from 'marked';

export const dataContext=createContext();

function ContextProvider({children}) {
    
    const [data,setData]=useState(null)
    const [genieData,setGenieData]=useState(null)
    const [genieMode,setgenieMode]=useState(true)
    const [geminiMode,setgeminiMode]=useState(true)
    const [prompt,setPrompt]=useState("");
    const [sent,setSent]=useState(false)
    
    const [input,setInput]=useState("")
    const [allPrompts,setAllPrompts]=useState([]);
    const [geneloading,setgeneLoading]=useState(true)
    const [geminiLoading,setgeminiLoading]=useState(true)
    const [theme,setTheme]=useState("Light")


    const fetchData= async (prompt)=>{
          let getdata=await run(prompt)
          const formattedResponse = marked(getdata);
          console.log(formattedResponse)
         
        return formattedResponse;
        }
        
    useEffect(()=>{
          setAllPrompts(prev=> prev.length?[...prev,prompt]:[prompt])
        },[prompt])
    
    const contextvalues={data,fetchData,input,setInput,sent,setSent,prompt,setPrompt,geminiLoading,geneloading,setgeneLoading,setgeminiLoading,allPrompts,genieMode,geminiMode,setgenieMode,genieData,setgeminiMode,setGenieData,setData,theme,setTheme}

  return (
    <dataContext.Provider value={contextvalues}>
   {children}
    </dataContext.Provider>
  )
}

export default ContextProvider
