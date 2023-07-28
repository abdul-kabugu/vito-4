// @ts-nocheck


import useTruncateText from '@/hooks/useTruncateText'
import {useState, useContext} from 'react'
import { tipsTires, sponsorPeriods } from '../constants'


export default function TipUser({video}) {
    const {shortenTxt} = useTruncateText()
    const [amount, setamount] = useState("")
    const [balance, setBalance] = useState(null);
    const [isDonating, setisDonating] = useState(false)
    const [currentStep, setcurrentStep] = useState(0)
 const [selectedTier, setselectedTier] = useState(0)
const [amountToDonate, setamountToDonate] = useState(1)



    const donate = async () => {
       console.log("hellow  donate to that")
         
      }

        const getCurrentStep = () => {
          if(currentStep === 0) {
              return(
                <div className=' flex gap-4 flex-wrap justify-center'>
                {tipsTires.map((tip, i) => {
                  return(
                    <div key={i} onClick={() => setamountToDonate(tip.amount)} className={`flex ${tip.amount === amountToDonate && "border-fuchsia-800 bg-fuchsia-700 text-white"} gap-2 border border-fuchsia-900/50 py-1.5 px-4 rounded-lg cursor-pointer`}> 
                      <p>{tip.emoji}</p>
                      <p>{tip.title}</p>
                    </div>
                  )
                })}
              </div>
              )
          } else if(currentStep === 1){
            return(
              <div className='flex gap-4 flex-wrap justify-center'>
                <h1 className='text-lg'>Woow   You got badge   Tweet about it</h1>
              </div>
            )
          } 
        }

        const getCurrentStateBtn = () => {
          if(currentStep === 0) {
            return(
              <div className='flex items-end justify-end'>
              <button className='bg-fuchsia-700 my-3 hover:bg-fuchsia-600 w-[100px] text-white  py-1 px-4 rounded-md' onClick={() => setcurrentStep(1)}> Next </button>
              </div>

            )
          } else if(currentStep === 1) {
            return(
               <div className='flex justify-between items-center'>
                 <button className='border border-fuchsia-500 hover:bg-fuchsia-600 text-white w-[100px] py-1 px-4 rounded-md' onClick={() => setcurrentStep(0)}> Prev </button>

                  <button className='bg-fuchsia-700 my-3 hover:bg-fuchsia-600 w-[100px] text-white  py-1 px-4 rounded-md'> Tweet  </button>

               </div>
            )
          }
        }
  return (
    <div>
   
  <div className='flex gap-3 justify-center '>
  {/*sponsorPeriods.map((item, i) => {
    return(
      <div key={i} className={`border ${selectedTier === i && "bg-fuchsia-700 text-white"} border-fuchsia-900/60 py-1.5 px-3 rounded-lg cursor-pointer`} onClick={() => setselectedTier(i)}>
        <p>{item} </p>
         </div>
    )
  })*/}
  </div>

  <div className='flex gap-4 flex-wrap justify-center my-6'>
    {/*tipsTires.map((tip, i) => {
      return(
        <div key={i} onClick={() => setamountToDonate(tip.amount)} className={`flex ${tip.amount === amountToDonate && "border-fuchsia-800 bg-fuchsia-700 text-white"} gap-2 border border-fuchsia-900/50 py-2 px-4 rounded-lg cursor-pointer`}> 
          <p>{tip.emoji}</p>
          <p>{tip.title}</p>
        </div>
      )
    })*/
      getCurrentStep()
    }
  </div>

    {/*} <button className='bg-fuchsia-700 my-3 hover:bg-fuchsia-600 text-white w-[100%] py-1.5 px-4 rounded-md' onClick={() => donate()}>{isDonating ? "Sending Tip.." : "Send Tip"} </button>*/}
     {getCurrentStateBtn()}
    </div>
  )
}
