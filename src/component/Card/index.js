import { useState } from 'react'
import { Card, Row, Col, Divider, Typography, Button, Input, Space } from 'antd'

const CardComponent = (props) => {
  const [currentSubtask, setCurrentSubtask] = useState('')

  const {
    id,
    name,
    isAllDone,
    task,
    onAddSubTask,
    onDeleteTask,
    onDeleteSubTask,
    onDuplicateTask,
    onTaskDone,
    onTaskUndo,
  } = props

  return (
    <Card
      key={id}
      title={name}
      style={{ width: 600 }}
      extra={
        <>
          <Button onClick={() => onDuplicateTask(id)} type='primary'>
            Duplicate
          </Button>{' '}
          <Button onClick={() => onDeleteTask(id)} type='primary' danger>
            Delete
          </Button>
        </>
      }
    >
      <Space direction='vertical' style={{ width: '100%' }}>
        <Space>
          <Input
            onChange={(e) => setCurrentSubtask(e.target.value)}
            placeholder='Enter Subtask Name'
            style={{ width: 400 }}
          />
          <Button
            onClick={() => onAddSubTask(id, currentSubtask)}
            type='primary'
          >
            Add Subtask
          </Button>
        </Space>
        {task.length > 0 && <Divider />}
        {task.map((val, index) => {
          if (!val.isDone) {
            return (
              <Row key={index}>
                <Col span={16}>
                  <Typography.Text>{val.name} (Todo)</Typography.Text>
                </Col>
                <Col span={8}>
                  <Button onClick={() => onTaskDone(id, index)} type='primary'>
                    Done
                  </Button>{' '}
                  <Button
                    onClick={() => onDeleteSubTask(id, index)}
                    type='danger'
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            )
          } else {
            return (
              <Row>
                <Col span={16}>
                  <Typography.Text style={{ textDecoration: 'line-through' }}>
                    {val.name} (Done)
                  </Typography.Text>
                </Col>
                <Col span={8}>
                  <Button onClick={() => onTaskUndo(id, index)} type='primary'>
                    Undo
                  </Button>{' '}
                  <Button
                    onClick={() => onDeleteSubTask(id, index)}
                    type='danger'
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            )
          }
        })}
      </Space>
    </Card>
  )
}

export default CardComponent
