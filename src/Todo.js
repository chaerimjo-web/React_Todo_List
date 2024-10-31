import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Todo = ({data, checkUpdate, deleteTodo, updateTodo})=>{
  const [mode, setMode] = useState('read'); //1. 초깃값 read모드로 설정
  const [isChecked, setIsChecked] = useState(false); //클릭->isChecked바뀜 true false
  const [text, setText] = useState(data.text); //텍스트 settext로 통해 변경하기

  let className = '';
  let formclass = 'visually-hidden';
  const handleCheckboxClick = (e)=>{
    let value = !isChecked;
    setIsChecked(value) //한번클릭 true -> 클릭 false 
    checkUpdate(data.id, value) //바뀐 값 id,value
  }
  if(isChecked){ //값이 true 이면 checked넣기
    className = 'checked'; 
  }
  if(mode === 'edit'){ //값이 true 이면 checked넣기
    className += ' visually-hidden'; 
    formclass = '';
  }
  let todoDelete = ()=>{
    deleteTodo(data.id);
  }
  let changeMode = ()=>{
    setMode('edit'); //edit으로 변경
  }
  let changeText = (value)=>{ //사용자가 입력한 내용 받아오기
    setText(value); //edit으로 변경
  }
  let todoUpdate = ()=>{ //수정한 글과 번호
    updateTodo(data.id, text);
    setMode('read');
  }
  let cancelEdit = ()=>{ //수정한 글과 번호
    setText(data.text);
    setMode('read');
  }
  return(
    <div>
      <Form.Check type="checkbox" id={data.id} >
        <Form.Check.Input type="checkbox" onClick={handleCheckboxClick}/>
        <Form.Check.Label className={className}>{text}</Form.Check.Label>
          <Form className='d-flex gap-1' onSubmit={todoUpdate}>
            <Form.Group className={formclass}>
              <Form.Control type="text" value={text} onChange={(e)=>{
                changeText(e.target.value)
              }}/>
            </Form.Group>
            <Button className={formclass} type="submit" variant="primary" size="sm" onClick={changeMode}>입력</Button>
            <Button className={formclass} variant="primary" type="button" size="sm" onClick={cancelEdit}>취소</Button>
          </Form>
        <Button variant="secondary" size="sm" onClick={changeMode}>수정</Button>
        <Button variant="danger" size="sm" onClick={todoDelete}>삭제</Button>
      </Form.Check>
    </div>
  )
}

export default Todo;