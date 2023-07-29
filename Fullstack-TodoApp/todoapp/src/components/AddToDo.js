import styled from "styled-components";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchData } from "../features/todoSlice";
import { toast } from 'react-toastify'
import { mobile } from '../responsive'


const AddToDo = () => {
    const dispatch = useDispatch()
    const todos = useSelector((state) => state.todos.data)

    const [startDate, setStartDate] = useState(new Date());

    const [titleInput, setTitleInput] = useState("")
    const [textareaInput, setTextareaInput] = useState("")

    const MyContainer = ({ className, children }) => {
        return (
            <DateContainer>
                <CalendarContainer className={className}>
                    <Note>Başlama tarihini seçiniz</Note>
                    <div>{children}</div>
                </CalendarContainer>
            </DateContainer>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault()//submit edilirken sayfanın yenilenmesini engeller
        const newTodo = {
            id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
            title: titleInput.charAt(0).toUpperCase() + titleInput.slice(1).toLocaleLowerCase(),
            subject: textareaInput,
            targetDate: startDate
        }
        try {
            if (newTodo.title) {
                await axios.post('http://localhost:5000/api/todo', newTodo)
                dispatch(fetchData()) //yeni todo eklendiğinde alttaki listede anında görünmesi için
                toast.success(`${titleInput.charAt(0).toUpperCase() + titleInput.slice(1).toLocaleLowerCase()} added`, {
                    theme: 'colored',
                })
                const date = new Date()
                setTitleInput("")
                setTextareaInput("")
                setStartDate(date)
            }
        } catch (error) {
            console.error('Todo eklenirken bir hata oluştu', error)
        }
    }
    return (
        <MainDiv>
            <Form onSubmit={handleSubmit}>
                <TitleInput type="text" placeholder="Add title.." id="title" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
                <TitleTextarea rows="4" cols="50" placeholder="Add subject.." value={textareaInput} onChange={(e) => setTextareaInput(e.target.value)} />
                <div>
                    <label htmlFor='title'>Target Date :</label>
                    <DatePicker
                        name="title"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        calendarContainer={MyContainer}
                        customInput={<Input />}
                    >
                    </DatePicker>
                </div>
                <Button type="submit">Add ToDo</Button>
            </Form>
        </MainDiv>
    );
};

export default AddToDo;

const MainDiv = styled.div`
  width: 90%;
  background-color: #ff8e9e;
  height: 30vh;
  padding: 1rem;
  margin: 1rem 0;
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  ${mobile({ margin: '0.5rem 0', width: 'calc(100% - 1rem)', padding: '0.5rem' })};
`

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    label{
        color: white;
        margin: 5px;
        margin-right: 20px;
        ${mobile({ fontSize: '0.9rem',marginRight:'0.5rem' })};
    }
`

const TitleInput = styled.input`
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    padding: 0 10px;
    margin-bottom: 5px;
    font-size: 14px;
    color: #071952;
    font-weight: 500;
    font-family:'Montserrat', sans-serif;
    background-color: #F9B5D0;
    text-transform: capitalize;

    &:focus{
    background-color: #EEEEEE;
    outline:1px solid #FF597B;
    }
`

const TitleTextarea = styled.textarea`
    width: 100%;
    height:120px;
    border: none;
    outline: none;
    padding: 5px 10px;
    margin-bottom: 5px;
    font-size: 14px;
    color: #071952;
    font-weight: 400;
    font-family:'Montserrat', sans-serif;
    background-color: #F9B5D0;
    ${mobile({height:'100px'})};

    &:focus{
    background-color: #EEEEEE;
    outline:1px solid #FF597B;
    }
`

const Note = styled.h6`
    color: white;
    font-size: 14px;
    text-align: center;
    margin: 5px;
`
const Button = styled.button`
    height: 40px;
    padding: 5px 20px;
    color: #fff;
    background-color: #F9B5D0;
    border: none;
    outline: none;
    align-self: flex-end;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
    ${mobile({height:'35px',letterSpacing:'normal',padding:'5px 10px'})};

    &:hover{
        background-color: #eeeeee;
        color: #FF597B;
        outline:1px solid #FF597B;
    }
`

const DateContainer = styled.div`
     padding: 10px;
     background: #35A29F;
     border-radius: 5px;
     ${mobile({padding:'0.2rem'})}
`

const CalendarContainer = styled.div`
  background-color: #0B666A;

  div{
    position: relative; 
  }
`

const Input = styled.input`
    margin: 0;
    border: none;
    outline: none;
    height: 30px;
    padding: 5px;
    margin: 5px 0;
    text-align: center;
    letter-spacing: 1px;
    font-weight:500;
    color: #fff;
    font-size: 16px;
    width: 120px;
    background-color: #F9B5D0;
    ${mobile({width:'100px'})}

    &:focus{
    background-color: #EEEEEE;
    color:#0B666A;
    outline:1px solid #FF597B;
    }
`