import axios from 'axios'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router'
import styled from 'styled-components'
import TaskCard from '../TaskCard'
import TaskTextDisplay from '../TaskTextDisplay'

export default function SharingTask() {
    const {link} = useParams()
    const [task, setTask] = useState({title: '', content: ''})

    useEffect(() => {
        axios(`/api/task/${link}`)
            .then(({data}) => {
                const task = data.data
                console.log(task, 'task')

                setTask(task)
            })
            .catch(console.error)
    }, [])

    console.log(task)

    return (
        <Container>
            <StyledTaskCard>
                <TaskTextDisplay text={task.title} titleMode />
                <TaskTextDisplay text={task.content} contentMode />
            </StyledTaskCard>
        </Container>
    )
}

const Container = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledTaskCard = styled(TaskCard)`
    padding: 20px;
`
