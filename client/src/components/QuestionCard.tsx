import React,{useState,useEffect} from 'react';
import { QuestionWrapper, ButtonWrapper } from './QuestionCard.styles'
import IQuestion from '../interfaces/IQuestion';
import { TimerDesign } from './timer.styles';

type Props = {
  timer:number,
  setTimer:React.Dispatch<React.SetStateAction<number>>,
  questions: IQuestion[],
  question:string,
  questionNumber:number,
  setQuestionNumber:React.Dispatch<React.SetStateAction<number>>,
  setQuestion:React.Dispatch<React.SetStateAction<string>>,
  answer:string,
  answers:string[],
  setAnswer:React.Dispatch<React.SetStateAction<string>>,
  setAnswers:React.Dispatch<React.SetStateAction<string[]>>
}


const QuestionCard: React.FC<Props> = ({timer,setTimer,questions,questionNumber, question, setQuestion, answer,answers,setAnswer, setAnswers,setQuestionNumber
}) => {
  const [ selectedOption, setSelectedOption] = useState<string>("");
  const handleOptionSelection = (event: React.MouseEvent<HTMLButtonElement>) : void =>{
    setSelectedOption(event.currentTarget.name)
  }

  const [time, setTimedOut] = useState(true);

  useEffect(()=>{
    setQuestionNumber((prev)=>prev+1);
    if(questions.length){
      
      if(selectedOption === answer && time){
        setTimer(30);
        setAnswer(questions[questionNumber].correctAnswer)
        setQuestion(questions[questionNumber].question);
        setAnswers(questions[questionNumber].answers);
      }
    }
  },[selectedOption])

  useEffect(() => {
    const interval = setInterval(() => {
      if(timer === 0) setTimedOut(false);
      if(timer > 0){
        setTimer((prev) => prev - 1);
      }
      }, 1000)
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <>
      <TimerDesign>{timer}</TimerDesign>
      <QuestionWrapper>
        {question}
      </QuestionWrapper>
      <ButtonWrapper
      >
        {answers.map((option)=>{
          return (
            <button name={option} onClick={handleOptionSelection}>{option}</button>
          );
        })}
      </ButtonWrapper>
    </>
  )
}

export default QuestionCard;