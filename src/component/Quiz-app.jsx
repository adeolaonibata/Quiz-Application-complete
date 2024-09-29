import React, { useRef, useState} from 'react'
import "./QuizApp.css"
import { Info } from '../assets/question'

const Quiz = () => {
  let [number, setNumber] = useState(0)
  let [questions, setQuestions] = useState(Info[number])
  let [correct, setCorrect] = useState(0);
  let [checked, setChecked] = useState(false)
  let [outcome, setOutcome] = useState(false)


  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let Array_List = [option1,option2,option3,option4];


  const CheckForAns = (e, answer)  => {
    if (checked === false) {
      if (questions.answer === answer) {
        e.target.classList.add("correct")
        setChecked(true);
        setCorrect(prev=>prev+1)
      } else {
        e.target.classList.add("wrong")
        setChecked(true)
        Array_List[questions.answer-1].current.classList.add("correct")
      }
    }
  }


//   

    function Next() {
      if (checked === true) {

        if (number === Info.length-1) {
          setOutcome(true)
          document.querySelector(".container").style.height = "270px"
          return 0;
        }
        setNumber(++number);
        setQuestions(Info[number]);
        setChecked(false);
       
        Array_List.map((optn) => {
          optn.current.classList.remove("correct");
          optn.current.classList.remove("wrong");
          return null;
        })
      }
    }

    function Reset() {
      document.querySelector(".container").style.height = "750px"
      setChecked(false)
      setNumber(0)
      setOutcome(false)
      setCorrect(0)
      document.querySelector(".container").style.transition.height = "none"
    }
  return (
    <div>
      <div>
        <h1>React Quiz Application</h1>
        <div className="container">
          <div className="content-container">

          </div>
            <h3 className='header'>Quiz App</h3>
            <hr />

            {outcome?<></>:
            <>
            <p className='question'>{number+1}. {questions.Question}</p>
            <ul>
                <li ref={option1} onClick={(e) => CheckForAns(e, 1)}>{questions.option1}</li>
                <li ref={option2} onClick={(e) => CheckForAns(e, 2)}>{questions.option2}</li>
                <li ref={option3} onClick={(e) => CheckForAns(e, 3)}>{questions.option3}</li>
                <li ref={option4} onClick={(e) => CheckForAns(e, 4)}>{questions.option4}</li>
            </ul>
            <button className="btn" onClick={Next}>Next</button>
            <div className='para'>
            <p>Question {number+1 } of {Info.length}</p>
            </div>
            </>
            }
            {outcome?<>
            <div className="remainder">
              <h1 className="score">You score {correct} out of {Info.length}</h1>
              <button className="reset" onClick={Reset}>Reset</button>
            </div>
            </>:<></>
            }
        </div>
      </div>

      
    </div>
  )
}


export default Quiz
