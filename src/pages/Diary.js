import { useContext, useEffect, useState } from "react";
import {useParams , useNavigate} from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../Utill/data";
import MyButton from "../components/myButton";
import { emotionList } from "../Utill/emotion";



const Diary = () => {

    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(() => {
        if (diaryList.length >= 1){
            const targetdiary = diaryList.find((e) => parseInt(e.id) === parseInt(id));
            if(targetdiary){
                setData(targetdiary);
            }else {
                alert("일기없어");
                navigate('/', {replace:true})
            }
        }
    },[id,diaryList]);

    if (!data){
        return <div className="DiaryPage">로딩중이에요...</div>;
    } else{

        const curEmotionDatas = emotionList.find((e) => parseInt(e.emotion_id) === parseInt(data.emotion))
        console.log(curEmotionDatas);


        return (
            <div className="DiaryPage">
                <MyHeader rightChild={<MyButton text={'수정하기'} onClick={() => navigate(`/edit/${data.id}`)}/>} leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)}/>} headText={`${getStringDate(new Date(data.date))} 기록`}/> 
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className="diary_img_wrapper">
                            <img src = {curEmotionDatas.emotion_img}/>
                            <div className="emotion_descript">
                                {curEmotionDatas.emotion_descript}
                                
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
};
export default Diary;