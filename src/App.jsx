import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  
const [range , setRange] = useState(8);
const [numallow , setNumAllow] = useState(false);
const [charAllow , setCharAllow] = useState(true);
const [password , setPassword] = useState("");
// useRef hoook
const passwordRef = useRef(null);

const copyPasswordToClipboard = useCallback( () => {
  passwordRef.current?.select(); //to give select effect
 passwordRef.current?.setSelectionRange(0,31); //to select particular range
 window.navigator.clipboard.writeText(password);  //to copy password to clipboard
}, [password])



const passwordGenerator = useCallback( () => {
  let pass = "";
  let str = "QWERTYUIOPLKMJNHBGVDFXCASZazsdxfcvgqwertyhbnjuiomlkp";

  if (numallow) str +="0145678923";
  if (charAllow) str +="!@#$%&*";

for (let i= 1; i <= range; i++) {
  let charNum = Math.floor(Math.random() * str.length + 1)
  
  pass += str.charAt(charNum);
}

setPassword(pass)
}, [range,numallow,charAllow,setPassword])
  
useEffect( () => {
passwordGenerator()
},[charAllow,numallow,range,setPassword])

  return (
    <>
    <div className='bg-black h-screen w-screen justify-center flex items-center'>
      
   
      <div className='bg-gray-800 '>
        <h1 className='p-2 m-2 text-3xl  text-center text-white'>Password Generator</h1>

             <input
             type="text"
             value={password}
             placeholder='password'
             readOnly
             className='w-[78%] my-2 ml-2 pl-2 text-orange-600 text-lg '
             ref={passwordRef}
             />

             <button 
             onClick={copyPasswordToClipboard}
             className='  bg-blue-700 w-[15%] my-2 mr-2 rounded-xl text-white p-1 '>Copy</button>

{/* //last 3 options */}
<div className='flex gap-4 p-3 text-green-500'>
    <div>
      <label>Range {range}</label>
      <input type="range" 
      min={8}
      max={30}
      value={range}
      onChange={(e) => setRange(e.target.value)}
      className='m-2'
      />
    </div>


    <div>
      <label htmlFor='numInput' >numbers</label>
      <input type="checkbox"
      defaultChecked={numallow}
      id="numInput"
      onChange={() => {
        setNumAllow ((prev) => !prev)
      }}
      className='m-2'
      />
      
    </div>

    <div>
      <label htmlFor="charInput">characters</label>
      <input type="checkbox" 
      defaultChecked = {charAllow}
      id="charInput"
      onChange={() => {
        setCharAllow((prev) => !prev)
      }}
      className='m-2'
      />
    </div>
</div>


      </div>
      </div>
    </>
  )
}

export default App
