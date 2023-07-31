import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { styled } from "styled-components"
import { CloseOutlined, CheckOutlined } from '@mui/icons-material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../features/todoSlice';
import { toast } from "react-toastify";
import { mobile } from '../../responsive'



const EditModal = ({ isOpen, onRequestClose, _id }) => {

    const dispatch = useDispatch()

    const [updatedTitle, setUpdatedTitle] = useState("")
    const [updatedSubject, setUpdatedSubject] = useState("")
    const [updatedCompleted, setUpdatedCompleted] = useState()
    const [startDate, setStartDate] = useState(new Date());//datepicker için


    //Edit yapılacak todo seçildi
    const todoToEdit = useSelector((state) => state.todos.data.find((todo) => todo._id === _id))


    //Modal açıldığı andaki inputlara seçilen todo nun bilgilerini yazdırdık
    useEffect(() => {
        if (todoToEdit) {
            setUpdatedTitle(todoToEdit.title)
            setUpdatedSubject(todoToEdit.subject)
            setStartDate(new Date(todoToEdit.targetDate))
            setUpdatedCompleted(todoToEdit.completed)
        }
       
    }, [todoToEdit]) //todoEdit her değiştiğinde useeffect tekrar çalışacak

    
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            background: 'none',
        },
        overlay: {
            background: 'rgba(0, 0, 0, 0.7)',
        },
    }
    const MyContainer = ({ className, children }) => {
        return (
            <DateContainer style={{ position: "relative" }}>
                <CalendarContainer className={className}>
                    <Note>Başlama tarihini seçiniz</Note>
                    <div>{children}</div>
                </CalendarContainer>
            </DateContainer>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault() //submit butonuna tıklandığında sayfa yenilenmesin diye
        try {
            await axios.put(`http://localhost:5000/api/todo/${_id}`, {
                title: updatedTitle,
                subject: updatedSubject,
                targetDate: startDate,
                completed: updatedCompleted
            })
            onRequestClose() //modalı kapatmak için
            toast.info(`${updatedTitle} updated`, {
                theme: 'colored',
            })
            dispatch(fetchData()) //modal kapandığında güncellenmiş veriler tabloya yansısın diye
        }

        catch (error) {
            console.error('Todo güncellenirken bir hata oluştu!', error);
        }

    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="ToDo Edit Modal"
        >
            <ModalContent>
                <CloseButton onClick={onRequestClose}><CloseIcon /></CloseButton>
                <Form onSubmit={handleSubmit}>
                    <TitleInput type="text" placeholder="Add title.." id="title" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
                    <TitleTextarea rows="4" cols="50" placeholder="Add subject.." value={updatedSubject} onChange={(e) => setUpdatedSubject(e.target.value)} />
                    <TodoState>
                        <TodoStateSpan>Tamamlandı mı?</TodoStateSpan>
                        <CheckIcon
                            onClick={() => setUpdatedCompleted(!updatedCompleted)}
                            bgcolor={updatedCompleted ? "#FF597B" : "#ddd"}
                            color={updatedCompleted ? "white" : "#ccc"} />
                    </TodoState>
                    <div>
                        <label htmlFor='title'>Tarih giriniz :</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            calendarContainer={MyContainer}
                            customInput={<Input />}
                        >
                        </DatePicker>
                    </div>
                    <Button type="submit">Edit</Button>
                </Form>

            </ModalContent>
        </Modal>
    )
}

export default EditModal


const ModalContent = styled.div`
  max-width: 800px;
  background: #1D5D9B;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 10px;
  position: relative;
  font-family:'Montserrat', sans-serif;
  color: white;
  width: 800px;
  height: 600px;
  ${mobile({ minWidth: '200px', maxWidth: '300px', padding: '40px 10px' })}
`

const CloseIcon = styled(CloseOutlined)`
    color:gray;
    cursor: pointer;
    &:hover{
        color: #1D5D9B; ;
    }
`

const CloseButton = styled.button`
    position: absolute;
    top:10px;
    right:10px;
    border: none;
    outline: none;
    display: flex;
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    ${mobile({ height: '25px', width: '25px' })}
`

const Form = styled.form`
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;

    label{
        color: white;
        margin-right: 20px;
        ${mobile({ fontSize: '0.9rem', marginRight: '10px' })}
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
    ${mobile({ padding: '0 15px', height: '35px' })}
 
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
     ${mobile({ padding: '5px' })}

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
    ${mobile({ width: '100px' })}

    &:focus{
    background-color: #EEEEEE;
    color:#0B666A;
    outline:1px solid #FF597B;
    }
`

const TodoState = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
`

const TodoStateSpan = styled.span`
    margin-right: 10px;
    text-decoration: underline;
    ${mobile({ fontSize: '0.9rem' })}
`
const CheckIcon = styled(CheckOutlined)`
    background-color:${props => props.bgcolor};
    color:${props => props.color};
    cursor: pointer;
    &:hover{
        color:white ;
        background-color: #FF597B;
    }
`
