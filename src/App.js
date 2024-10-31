import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from 'react-bootstrap/Form';
import { useCallback, useEffect, useState } from 'react';
import Todo from './Todo';
import Button from 'react-bootstrap/Button';

function App() {
  /*
  (key, value)
  데이터 쓰기
  window.localStorage.setItem('name', '홍길동');

  데이터 읽기
  let test = window.localStorage.getItem('name');
  console.log(test);

  데이터 삭제
  window.localStorage.removeItem('name');
  localStorage에는 모든 데이터가 문자열이여야한다 객체 자체가 들어갈 수 없다 
  객체를 -> 문자열로 변환해야한다. -> JSON.stringify(대상)

 let obj = {id:1, text:'learn web'};
 console.log(obj);

 let objString = JSON.stringify(obj);
 console.log(objString);

 window.localStorage.setItem('todo', objString);

 let test = window.localStorage.getItem('todo');
 let testObj = JSON.parse(test);
 console.log(testObj.test);
   */
  
  const [todo, setTodo] = useState([]);
  const [todoId, setTodoId] = useState(0);
console.log(todoId);
  /*
  let obj = [{id:1, text:'learn web'}]; //배열안 객체형식으로 출력 [{}]
  let objString = JSON.stringify(obj);
  window.localStorage.setItem('todo', objString);
   */

  let getTodoList = useCallback(()=>{
    console.log('getTodoList 실행');
    const todoStrFromLocalStorage = window.localStorage.getItem('todo');
    if(todoStrFromLocalStorage !== null && todoStrFromLocalStorage !== '[]'){ //값이 있으면
      const todoObj = JSON.parse(todoStrFromLocalStorage);
      setTodoId(todoObj);
      setTodoId(todoObj[todoObj.length-1].id);
    }
   
  },[]);

  let updateTodoId = useCallback(()=>{
    console.log('updateTodoId 실행');
    if(todo.length > 0){
      setTodoId(todo[todo.length-1].id);
    }else{
      setTodoId(0);
    }


//값이 있으면

  },[todo]);

  // let getTodoList = ()=>{ //storage 조회
  //   const todoStrFromLocalStorage = window.localStorage.getItem('todo');
  //   if(todoStrFromLocalStorage !== null && todoStrFromLocalStorage !== '[]'){ //값이 있으면
  //     const todoObj = JSON.parse(todoStrFromLocalStorage);
  //     setTodoId(todoObj[todoObj.length-1].id);
  //     setTodo(todoObj);
  //   }
  // }
  
  let setStorage = ()=>{
    console.log('setStorage 실행');
    
    let todoString = JSON.stringify(todo);
    window.localStorage.setItem('todo', todoString);
  };




   //로컬스토리지에서 todo라는 키값이 있으면 조회-> todo에 목록으로 저장
   useEffect(()=>{
    getTodoList(); 

  },[getTodoList]); //최초 한 번 실행,  getTodoList객체ㅇ 변경되면 getTodoList실행
  
   useEffect(()=>{
    setStorage();
  },[todo]) //최초 한 번 실행

   useEffect(()=>{
    updateTodoId();
  },[todo, updateTodoId]) //todo, updateTodoId 변경되면 todoId 업데이트

  let addTodo = (value)=>{ //2. 복사| 입력버튼누르면 할 일
    console.log('addTodo 실행');

    let newTodos = [...todo]; //기존의 값
    let newId = todoId + 1;
    setTodoId(newId); 
    newTodos.push({id:newId, text:value, checked:false});
    setTodo(newTodos); //const todo를 newtodos로 바꿈
    document.querySelector('#todo').value= '';
  }
  let checkUpdate = (id, value)=>{
    console.log('checkUpdate 실행');

    let newTodos = todo.map(item=> item.id === id ? {...item, checked:value} : item)
    setTodo(newTodos); 
  }
  let deleteTodo = (id)=>{
    console.log('deleteTodo 실행');

    let newTodos = [...todo];
    let idx = newTodos.findIndex(item=> item.id === id);
    newTodos.splice(idx, 1);

    setTodo(newTodos); 
  }
  let updateTodo = (id, text)=>{ //일치하는 인덱스번호
   
    let newTodos = todo.map(item=> item.id === id ? {...item, text:text} : item)
    setTodo(newTodos); 
  }


  let todos = todo.map((item, idx)=>
    <Todo data={item} key={idx} updateTodo={updateTodo} checkUpdate={checkUpdate} deleteTodo={deleteTodo}/>
  )
  return (    
    <div className="container">
      <h1>To_do_list</h1>
      <Form onSubmit={(e)=>{
        e.preventDefault();
        // console.log(e.target.todo.value);
        addTodo(e.target.todo.value); //1. 사용자가입력한값을 받음 /기존값 배열에 /
      }}>
        <Form.Group className="mb-3" controlId="todo">
          <Form.Label>할 일 입력</Form.Label>
          <Form.Control type="text" name="todo" placeholder="할 일을 입력하세요" />
        </Form.Group>
        <Button type="submit" variant="primary">입력</Button>
      </Form>
      <hr/>
      <div>
        {todos}
      </div>
    </div>
  );
}

export default App;
