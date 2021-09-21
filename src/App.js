import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [alert, setAlert] = useState({show: false, type: '',msg: ''})
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name){
      setAlert({show:true, type:'danger', msg:'Enter Something'})
    }else if(name && isEditing){
      setList(
        list.map((item)=>{
          if (item.id===editID) {
            return {...item, title: `${name} `}
          }
          return item
        })
      )
      setAlert({show:true, type:'success', msg:'Values Changed'})
      setName('')
      setEditID(null)
      setIsEditing(false)
    }
    else{
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list,newItem])
      setName('')
      setAlert({show:true, type:'success', msg:'Item added Successfully'})
    }
  }
  const clearList = () => {
    setList([])
  }
  //  Editing the value 
  const editItem = (id) => {
    const specificItem = list.find((item)=> item.id = id)
    setName(specificItem.title)
    setIsEditing(true)
    setEditID(id)
  }
  // Dealing with Alert
  const removeAlert = ()=> {
    setAlert({show: false, type: '',msg: ''})
  }
  // Dealing with editing and deleting items
  const removeItem = (id) => {
    const newList = list.filter((item)=> item.id !== id)
    setList(newList)
  }
  // Local Storage
  useEffect(()=> {
    localStorage.setItem('list', JSON.stringify(list))
  },[list])
  
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} list={list} removeAlert={removeAlert}/>}
        <h3>Study Planner</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. 2hr React Daily'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
      <div className='grocery-container'>
        <List items={list} removeItem={removeItem} editItem={editItem}/>
        <button className='clear-btn' onClick={clearList}>
          clear items
        </button>
      </div>)}
    </section>
  )
}

export default App
