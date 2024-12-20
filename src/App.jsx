import Die from "../components/Die"
import {useEffect, useState} from "react";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
export default function App() {
       function allNewDice(){
        const arr=[];
        for(let i=0;i<10;i++){
            arr.push(
                {
                    value:Math.ceil(Math.random()*6),
                    held:false,
                    id:nanoid(),
                }
            );
        }
        return arr;
    }

    const [state, setState] = useState(allNewDice());
    const [tenzies,setTenzies] = useState(false);
    const [count, setCount] = useState(0);

   // const d = new Date();
    //let time = d.getTime();
    //const [Time, setTime] = useState(time);

    useEffect(()=>{
        const allHeld=state.every(item=>item.held);
        const firstVal=state[0].value;
        const allSameValue=state.every(item=>item.value===firstVal)
        if(allHeld && allSameValue){
            setTenzies(true)
        }
    }, [state]);

     const val=state.map(item=>{
        return <Die
            holdDice={()=>holdDice(item.id)}
            value={item.value}
            held={item.held}
        />
    })

    function handle(){
        if(tenzies===false){
           setState(prevState => prevState.map(item=>{
            return item.held ?
                item
                :
                {
                value:Math.ceil(Math.random()*6),
                held:false,
                id:nanoid(),
                }
        }))
            setCount(prevCount=>prevCount+1);
        } else{
            setTenzies(false);
            setState(allNewDice())
            setCount(0);
        }
    }
    function holdDice(id){
     setState(
        prevState=> prevState.map(item=>{
          return item.id===id?
              {...item,held:!item.held}
              :
              item
      })
     )
    }

    function reset(){
         setState(allNewDice);
         setCount(0);
         setTenzies(false);
    }


   localStorage.setItem('LeastRoll', JSON.stringify(Math.min(count)));

  return (
      <main className="flex-col bg-black h-[100vh]" >
          {tenzies && <Confetti />}
          <h1 className="font-bold text-3xl text-white text-center py-4 lg:text-3xl lg:font-extrabold lg:tracking-wider">Tenzies</h1>
          <p className="text-gray-500 text-center px-6 pt-4 pb-7">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="grid grid-cols-3 grid-rows-3  pl-8 gap-y-2.5 sm:grid sm:grid-cols-5 sm:grid-rows-2 sm:pl-20 sm:pr-6 lg:gap-y-8 lg:grid lg:grid-rows-2 lg:grid-cols-5 lg:px-40 xl:pl-72 xl:pr-94">
              {val}
          </div>
          <div className="flex items-center justify-center gap-10 py-6 sm:py-14">
              <button
                  className="font-serif bg-blue-600 text-white px-2.5 py-1.5 rounded-md"
                  onClick={handle}> {tenzies ? 'New Game' : 'Roll'}
              </button>

              <button className="font-serif bg-red-500 text-black px-2.5 py-1.5 rounded-md"
                      onClick={reset}>Reset
              </button>
          </div>
          <h1 className="text-gray-400 text-center">No of rolls : {count}</h1>
          <div className="text-center bg-black">
              {tenzies && <h1 className="font-bold text-xl text-yellow-400 sm:pt-8">Congrats You Won !</h1>}
          </div>
          <footer className="bg-black text-gray-600 flex items-center justify-center p-5">
              <p>&copy; mani jhaneswar | all rights reserved<sup>&#174;</sup></p>
          </footer>
      </main>
  )
}

// {tenzies && <h1 className="text-gray-500 font-md">Time Taken : {Time} secs</h1>}
