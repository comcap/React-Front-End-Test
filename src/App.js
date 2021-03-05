import { useState, useEffect } from 'react'
import { Button, Input, Space } from 'antd'
import styled from 'styled-components'

import CardComponent from './component/Card'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 16px 24px;
`

function App() {
  const [tasks, setTasks] = useState([])
  const [currentTasks, setCurrentTasks] = useState({})

  useEffect(() => {
    if (tasks.length > 0) {
      tasks.map((mainTask) => {
        let countDone = 0
        mainTask.task.map((subTask) => {
          if (subTask.isDone) {
            countDone++
          } else {
            countDone--
          }
        })

        if (mainTask.task.length === countDone) {
          mainTask.isAllDone = true
        } else {
          mainTask.isAllDone = false
        }
      })
    }
  }, [tasks])

  const onSubmitTask = () => {
    let tempTasks = [...tasks]

    let tempTask = {
      name: currentTasks,
      isAllDone: false,
      task: [],
    }

    setTasks([...tempTasks, tempTask])
  }

  const onAddSubTask = (id, currentSubtask) => {
    let tempTasks = [...tasks]
    let tempSubTask = {
      name: currentSubtask,
      isDone: false,
    }
    tempTasks[id].task = [...tempTasks[id].task, tempSubTask]
    setTasks(tempTasks)
  }
  const onDuplicateTask = (id) => {
    let tempTasks = [...tasks]
    tempTasks.push(tempTasks[id])
    setTasks(tempTasks)
  }

  const onTaskDone = (id, subID) => {
    let tempTasks = [...tasks]
    tempTasks[id].task[subID].isDone = true
    setTasks(tempTasks)
  }
  const onTaskUndo = (id, subID) => {
    let tempTasks = [...tasks]
    tempTasks[id].task[subID].isDone = false
    setTasks(tempTasks)
  }

  const onDeleteTask = (id) => {
    let tempTasks = [...tasks]
    tempTasks = tempTasks.filter((val, i) => i !== id)
    setTasks(tempTasks)
  }

  const onDeleteSubTask = (id, subID) => {
    let tempTasks = [...tasks]
    tempTasks[id].task = tempTasks[id].task.filter((val, i) => i !== subID)
    setTasks(tempTasks)
  }

  return (
    <Container>
      <Space>
        <Input
          onChange={(e) => setCurrentTasks(e.target.value)}
          style={{ width: 400 }}
          placeholder='Enter Task Name'
        />
        <Button onClick={onSubmitTask} type='primary'>
          Create Task
        </Button>
      </Space>
      <Space direction='vertical' style={{ marginTop: 24 }}>
        {tasks.map((val, index) => {
          return (
            <CardComponent
              key={index}
              id={index}
              onAddSubTask={onAddSubTask}
              onDeleteTask={onDeleteTask}
              onDeleteSubTask={onDeleteSubTask}
              onDuplicateTask={onDuplicateTask}
              onTaskDone={onTaskDone}
              onTaskUndo={onTaskUndo}
              {...val}
            />
          )
        })}
      </Space>
    </Container>
  )
}

export default App
