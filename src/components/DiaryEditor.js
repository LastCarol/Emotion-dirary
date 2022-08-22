import {useNavigate} from "react-router-dom";
import { useRef, useState,useContext, useEffect } from "react";

import MyHeader from "./MyHeader";
import MyButton from "./myButton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

import { getStringDate } from "../Utill/data";
import { emotionList } from "../Utill/emotion";


const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";




const DiaryEditor = ({isEdit, originData}) => {

    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [emotion, setEmotion] =useState(3);
    const [date, setDate] = useState(getStringDate(new Date()))
    const navigate = useNavigate();
    
    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    }
    
    const {onCreate, onEdit} = useContext(DiaryDispatchContext);


    const handleSubmit = () =>{
        if(content.length < 1){
            contentRef.current.focus();
            return;
        }

        if(window.confirm(isEdit ? "일기를 수정할래요?" : "새로운 일기 쓸래요?")){
            if(!isEdit){
                onCreate(date,content,emotion);
            }else{
                onEdit(originData.id, date, content, emotion);
            }
        }

        console.log(date);
        navigate('/',{replace: true})        
    }

    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    },[isEdit,originData]);

    return (
        <div className="DiaryEditor">
            <MyHeader headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"} leftChild={<MyButton text={"< 뒤로가기"} onClick={()=>navigate(-1)}/>}/>
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input className="input_date" value={date} onChange={(e) => setDate(e.target.value)} type='date'/>
                    </div>                    
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((e) => (
                            <EmotionItem onClick={handleClickEmote} key={e.emotion_id} {...e} isSelected={e.emotion_id === emotion}/>
                        ))}                        
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea placeholder="오늘은 어떠셧나요?" ref={contentRef} value={content} onChange={(e)=>setContent(e.target.value)}/>
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={'취소하기'} onClick={()=>navigate(-1)}/>
                        <MyButton text={'작성완료'} type={'positive'} onClick={handleSubmit}/>
                    </div>
                </section>
            </div>            
        </div>
    );
}

export default DiaryEditor;