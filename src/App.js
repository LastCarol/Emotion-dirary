import './App.css';
import React, { useReducer,useRef } from 'react';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
// import MyButton from './components/myButton';
// import MyHeader from './components/MyHeader';

const reducer = (state,action)=>{
  let newState = [];
  switch(action.type){
    case 'INIT' :{
      return action.data;
    }
    case 'CREATE':{
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE':{
      newState = state.filter((e) => e.id !== action.targetId);
      break;
    }
    case 'EDIT':{
      newState = state.map((e)=>e.id === action.data.id?{...action.data}: e)
      break;
    }
    default:
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id :1,
    emotion : 1,
    content: "오늘의 일기 1번",
    date: 1661005177529
  },
  {
    id :2,
    emotion : 2,
    content: "오늘의 일기 2번",
    date: 1661005177530
  },
  {
    id :3,
    emotion : 3,
    content: "오늘의 일기 3번",
    date: 1661005177531
  },
  {
    id :4,
    emotion : 4,
    content: "오늘의 일기 4번",
    date: 1661005177532
  },
  {
    id :5,
    emotion : 5,
    content: "오늘의 일기 5번",
    date: 1661005177533
  },
]

function App() {

  const [data,dispatch] = useReducer(reducer,dummyData);

  console.log(new Date().getTime());

  const dataId = useRef(0);

  const onCreate = (date,content,emotion) => {
    dispatch({
      type : "CREATE",
      data:{
      id:dataId.current,
      data: new Date(date).getTime(),
      content,
      emotion
    }});
    dataId.current += 1
  }

  const onRemove = (targetId) => {
    dispatch({type:'REMOVE',targetId});
  }

  const onEdit = (targetId,date,content,emotion)=>{
    dispatch({
      type:'EDOT',
      data:{
        id:targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      }
    })
  }


  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value ={{
        onCreate,
        onEdit,
        onRemove,
      }}>
    <BrowserRouter>
      <div className="App">
        {/* <MyHeader headText={"App"} leftChild = {<MyButton text={'왼쪽버튼'} onClick={()=> {alert("왼쪽 클릭")}}/>}
        rightChild= {<MyButton text={"오른쪽 버튼"} onClick={()=>alert("오른쪽 클릭") }/>}/> */}


        {/* <MyButton text={'버튼'} onClick={()=>alert("버튼클릭")} type = {'positive'}/>
        <MyButton text={'버튼'} onClick={()=>alert("버튼클릭")} type = {'negative'}/>
        <MyButton text={'버튼'} onClick={()=>alert("버튼클릭")}/> */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/new" element={<New/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
          <Route path="/diary/:id" element={<Diary/>}/>          
        </Routes>
      </div>
    </BrowserRouter>
    </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}




export default App;
