import { styled } from "styled-components"
import { CheckOutlined, CloseOutlined, EditOutlined, FilterAltOutlined } from '@mui/icons-material';
import DetailModal from "./modals/DetailModal";
import EditModal from "./modals/EditModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from "../features/todoSlice";
import axios from 'axios'
import { toast } from "react-toastify";



const ToDoList = () => {

    const todos = useSelector((state) => state.todos.data)// storedaki veriyi aldık
    const dispatch = useDispatch()

    //sayfa açılır açılmaz var olan todoları listelemek için
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])


    // const [modalIsOpen, setModalIsOpen] = useState(false);
    // const [editModalIsOpen, setEditModalIsOpen] = useState(false)

    // const openDetailModal = () => {
    //     setModalIsOpen(true)
    // }
    // const closeDetailModal = () => {
    //     setModalIsOpen(false)
    // }
    // const openEditModal = () => {
    //     setEditModalIsOpen(true)
    // }
    // const closeEditModal = () => {
    //     setEditModalIsOpen(false)
    // }

    const [modals, setModals] = useState({
        detailModalIsOpen: false,
        editModalIsOpen: false
    })

    const openModal = (modalType) => {
        setModals({ ...modals, [modalType]: true })
    }
    const closeModal = (modalType) => {
        setModals({ ...modals, [modalType]: false })
    }


    //Delete Butonuna tıklandığında yapılacaklar
    const handleDelete = async (_id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todo/${_id}`)
            dispatch(fetchData())
            toast.error(`${todos.find((todo) => todo._id === _id).title} deleted`, {
                theme: 'colored',
            })
        } catch (error) {
            console.log(`${_id} li todo silinirken bir hata oluştu`, error)
        }
    }


    const [selectedTodo, setSelectedTodo] = useState(null);
    const [selectedEditTodo, setSelectedEditTodo] = useState(null);
    const handleDetailModal = (todo) => {
        setSelectedTodo(todo)
        openModal('detailModalIsOpen')
    }

    const handleEdit = (todo) => {
        setSelectedEditTodo(todo)
        openModal('editModalIsOpen')
    }


    //Check Butonuna tıklandığında yapılacaklar
    const handleCheck = async (_id) => {
        const checkedTodo = todos.find((todo) => todo._id === _id)
        if (!checkedTodo) {
            console.log("Boş todo")
            return
        }
        try {
            await axios.put(`http://localhost:5000/api/todo/${_id}`, {
                completed: !checkedTodo.completed
            })

            dispatch(fetchData())
        } catch (error) {
            console.log("Güncellenirken bir hata oluştu", error)
        }
    }

    const [filterClicked, setFilterClicked] = useState(false)
    const [filterTitle, setFilterTitle] = useState("")

    const filteredTodos = todos.filter((todo) => {
        if (filterClicked === true) {
            return (!todo.completed)
        } else {
            return (
                filterTitle.toLocaleLowerCase() === ''
                    ? todo.title
                    : todo.title.toLocaleLowerCase().includes(filterTitle)
            )
        }
    })

    let count = 1
    return (
        <>
            <DetailModal
                isOpen={modals.detailModalIsOpen}
                onRequestClose={() => closeModal('detailModalIsOpen')}
                title={selectedTodo?.title}
                subject={selectedTodo?.subject}
                targetDate={selectedTodo?.targetDate}
                completed={selectedTodo?.completed}
            />
            <EditModal
                isOpen={modals.editModalIsOpen}
                onRequestClose={() => closeModal('editModalIsOpen')}
                _id={selectedEditTodo?._id}

            />
            <MainDiv>
                <TableWrapper>
                    <Table>

                        <thead>
                            <Tr>
                                <Th>No</Th>
                                <ThFilter>
                                    <Search
                                        type="text"
                                        placeholder="Filter by title.."
                                        value={filterTitle}
                                        onChange={(e) => setFilterTitle(e.target.value)}>
                                    </Search>
                                    <div>
                                        <Filter onClick={()=>setFilterClicked(!filterClicked)} color={filterClicked ? "inherit" : "gray"} />
                                    </div>
                                </ThFilter>
                                <Th>Actions</Th>
                            </Tr>
                        </thead>
                        <Tbody>
                            {filteredTodos.map((todo) => (
                                <Tr key={todo._id}>
                                    <TdId>{count++}</TdId>
                                    <Tdtitle
                                        onClick={() => handleDetailModal(todo)}
                                        line={todo.completed ? "line-through" : "none"}
                                    >
                                        {todo.title}
                                    </Tdtitle>
                                    <TdActions>
                                        <div>
                                            <CheckIcon
                                                onClick={() => handleCheck(todo._id)}
                                                color={todo.completed ? "#FF597B" : "gray"}
                                            />
                                            <CloseIcon onClick={() => handleDelete(todo._id)} />
                                            <EditIcon
                                                style={{ fontSize: '20px' }}
                                                onClick={() => handleEdit(todo)}
                                            />
                                        </div>

                                    </TdActions>
                                </Tr>
                            ))}

                        </Tbody>
                    </Table>
                </TableWrapper>
            </MainDiv>
        </>
    )
}

export default ToDoList

const MainDiv = styled.div`
    width:90%;
    background-color:#F9B5D0;
    height: 40vh;
    padding: 1rem;
    font-family:'Montserrat', sans-serif;
`

const TableWrapper = styled.div`
    width: 100%;
    height:100%;
    overflow-y: auto;
`

const Table = styled.table`
    width: 100%;

`

const Tbody = styled.tbody`
    width: 100%;
`
const Tr = styled.tr`
    background-color: aliceblue;
    text-align: center;
    border: 1px solid gray;

    &:nth-child(odd) {
        background-color: #EEEEEE;
    }
`

const Th = styled.th`
    background-color: beige;
    height: 40px;
    color:#FF597B ;
`

const ThFilter = styled(Th)`
    display: flex;
    align-items: center;

    div{
        flex:1;
        background-color:lightblue;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const Filter = styled(FilterAltOutlined)`
    margin: 0 5px;
    cursor: pointer;
    color: ${(props) => props.color};
`
const Search = styled.input`
    flex: 6;
    width: 100%;
    height: 100%;
    outline: none;
    border:none;
    padding: 0 10px;
    font-size: 16px;
    background-color: beige;
    font-family:'Montserrat', sans-serif;
    font-weight: 400;
    text-transform:capitalize;
`

const Td = styled.td`
    height: 40px;
    padding: 0 10px;
`

const TdId = styled(Td)`
    width: 10%;
`
const Tdtitle = styled(Td)`
    text-align: left;
    cursor: pointer;
    text-decoration: ${(props) => props.line} 0.1em #FF597B;
`

const TdActions = styled(Td)`
    width: 20%;
    div{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
`

const CheckIcon = styled(CheckOutlined)`
    color:${props => props.color};
    cursor: pointer;
    &:hover{
        color:#FF597B ;
    }
`
const CloseIcon = styled(CloseOutlined)`
    color:gray;
    cursor: pointer;
    &:hover{
        color: #000; ;
    }
`
const EditIcon = styled(EditOutlined)`
    color:gray;
    cursor: pointer;
    &:hover{
        color: #1D5D9B; ;
    }
`
