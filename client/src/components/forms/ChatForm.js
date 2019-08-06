import React, { useState } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Col from 'muicss/lib/react/col';

const ChatForm = ({ sendChat }) => {
  const [message, setMessage] = useState('')

  const onSubmitMessage = (e) => {
    e.preventDefault()
    sendChat({ content: message })
  }

  return (
    <Form>
      <Col xs='12' md='8'>
        <Input placeholder='Message' onChange={e => setMessage(e.target.value)} />
      </Col>
      <Col xs='12' md='4'>
        <Button variant='raised' className='btn-chat' color='primary' 
          onClick={onSubmitMessage}>
          Send
        </Button>
      </Col>
    </Form>
  )
}

export default ChatForm