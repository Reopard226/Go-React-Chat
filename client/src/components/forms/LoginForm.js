import React, { useState } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Col from 'muicss/lib/react/col';

const LoginForm = ({ login }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErr, setEmailErr] = useState(false)

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
    if (!e.target.value) setEmailErr(true)
    else setEmailErr(false)
  }

  const loginSubmit = (e) => {
    e.preventDefault()
    if (emailErr || !email) return
    login({ email, password })
  }

  return (
    <Form>
      <Col xs='12' md='9'>
        <Input placeholder='Email' onChange={onChangeEmail} />
        {emailErr && <div className='error'>Email is required</div>}
        <Input placeholder='Password' type='password' onChange={e => setPassword(e.target.value)} />
      </Col>
      <Col xs='12' md='3'>
        <Button variant='raised' className='btn-login' color='primary' onClick={loginSubmit}>
          Login
        </Button>
      </Col>
    </Form>
  )
}

export default LoginForm