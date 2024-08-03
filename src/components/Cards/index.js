import React from 'react'
import "./style.css"
import { Card, Row } from 'antd'
import Button from '../Button'
function Cards() {
  return (
    <div>
        <Row className='my-row'>
            <Card className='my-card' title="Current Balance">
                0 Rupees
                < Button text="Reset Balance"/>
            </Card>
        </Row>
    </div>
  )
}

export default Cards
