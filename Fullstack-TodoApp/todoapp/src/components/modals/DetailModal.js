import React from 'react'
import Modal from 'react-modal'
import { styled } from "styled-components"
import { CloseOutlined } from '@mui/icons-material';
import { mobile } from '../../responsive'

const DetailModal = ({ isOpen, onRequestClose, title, subject, targetDate, completed }) => {

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
    };
    const colors = ["FF8551", "8062D6", "CECE5A", "749BC2", "CD6688", "BA704F", "35A29F"]
    const colorModal = "#" + colors[Math.floor((Math.random() * colors.length))]
    const date = new Date(targetDate)
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="ToDo Details Modal" //ekran okuyucular için
        >
            <ModalContent color={colorModal}>
                <CloseButton onClick={onRequestClose}><CloseIcon /></CloseButton>
                <div>
                    <ModalTitle >{title}</ModalTitle>
                    {completed ? <ModalState>Tamamlandı</ModalState> : null}
                    <ModalDate>{date.toLocaleDateString('tr-TR')}</ModalDate>
                    <Subject>
                        {subject}
                    </Subject>
                </div>
            </ModalContent>
        </Modal>
    )
}

export default DetailModal


const ModalContent = styled.div`
  max-width: 600px;
  min-width: 400px;
  background-color:${(props) => props.color};
  padding: 40px;
  position: relative;
  border-radius: 10px;
  ${mobile({ minWidth: '200px', maxWidth: '300px', padding: '25px' })};
 
  div{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px;
    gap: 10px;
    position: relative;
    font-family:'Montserrat', sans-serif;
    color: white;
    border:1px solid white;
    border-radius: 20px;
    justify-content: space-between;
    ${mobile({ padding: '20px' })};
  }
`

const CloseIcon = styled(CloseOutlined)`
    color:gray;
    cursor: pointer;
    &:hover{
        color: #000; ;
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
    border-radius: 5px;
    ${mobile({ width: '25px', height: '25px', top: '5px', right: '5px' })};
`

const ModalTitle = styled.h2`
    display: flex;
    align-items: center;
`
const ModalState = styled.span`
    font-size: 16px;
    text-decoration: underline;
`

const Subject = styled.p`

`

const ModalDate = styled.span`

`