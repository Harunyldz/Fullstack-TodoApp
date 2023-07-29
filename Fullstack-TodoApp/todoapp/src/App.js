import styled from 'styled-components'
import Quote from './components/Quote';
import AddToDo from './components/AddToDo';
import ToDoList from './components/ToDoList';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const MainDiv = styled.div`
  background-color:#EEEEEE ;
  width: 40%;
  height: 100vh;
  margin: auto;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const H1 = styled.h1`
  font-family:'Montserrat', sans-serif;
  font-size: 40px;
  font-weight: 600;
  color:#FF597B ;
  margin:0;
`

function App() {
  return (
    <>
      <ToastContainer />
      <MainDiv >
        <H1>To Do App</H1>
        <Quote />
        <AddToDo />
        <ToDoList />
      </MainDiv>
    </>
  );
}

export default App;
