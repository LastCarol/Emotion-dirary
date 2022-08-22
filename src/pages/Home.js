import { useContext, useEffect, useState } from "react";
import Myheader from './../components/MyHeader';
import MyButton from './../components/myButton';
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from "../App";

const Home = () => {

    const  diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate,setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() +1}월`

    useEffect(() => {
        if(diaryList.length >= 1){
        const firstDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            1
        ).getTime();

        const LastDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth() +1,
            0
        ).getTime();

        setData(diaryList.filter((e) => firstDay <= e.date <= LastDay))
        };
    },[diaryList, curDate]);

    useEffect(()=> {
        console.log(data);
    },[data]);

    const increaseMonth = () => {

        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()))
    }

    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()))
    }

    return (
        <div>            
            <Myheader headText={headText}
            leftChild ={<MyButton text={'<'} onClick={decreaseMonth}/>}
            rightChild = {<MyButton text = {'>'}  onClick={increaseMonth}/>}
            />
            <DiaryList diaryList={data}/>           
        </div>
    );
};

export default Home;