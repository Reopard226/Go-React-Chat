import React, { useState } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Col from 'muicss/lib/react/col';

const SignupForm = ({ signup }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErr, setEmailErr] = useState(false)
  const [nameErr, setNameErr] = useState(false)
  const [passwordErr, setPasswordErr] = useState(false)

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
    if (!e.target.value) setEmailErr(true)
    else setEmailErr(false)
  }

  const onChangeName = (e) => {
    setName(e.target.value)
    if (!e.target.value) setNameErr(true)
    else setNameErr(false)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
    if (!e.target.value) setPasswordErr(true)
    else setPasswordErr(false)
  }

  const signupSubmit = (e) => {
    e.preventDefault()
    if (emailErr || nameErr || passwordErr || !name || !email || !password) return
    signup({ name, email, password })
  }

  return (
    <Form>
      <Col xs='12' md='8'>
        <Input placeholder='Username' onChange={onChangeName} />
        {nameErr && <div className='error'>Username is required</div>}
        <Input placeholder='Email' onChange={onChangeEmail} />
        {emailErr && <div className='error'>Email is required</div>}
        <Input placeholder='Password' type='password' onChange={onChangePassword} />
        {passwordErr && <div className='error'>Password is required</div>}
      </Col>
      <Col xs='12' md='4'>
        <Button variant='raised' className='btn-signup' color='primary' onClick={signupSubmit}>
          Register
        </Button>
      </Col>
    </Form>
  )
}

export default SignupForm