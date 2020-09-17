import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Components/Form'
import * as yup from 'yup';
import axios from 'axios'

const defaultValues = {
  name: '',
  email: '',
  password: '',
  agree: false,
}

const defaultErrors = {
  name: '',
  email: '',
  password: '',
  agree: '',
}

const formSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Field needs to be a valid email address').required('Email is required'),
  password: yup.string().required('Email is required'),
  agree: yup.boolean().oneOf([true], 'You need to agree to the Terms of Condition'),
})


function App() {
  const [formValues, setFormValues] = useState(defaultValues)
  const [savedFormInfo, setSavedFormInfo] = useState([])
  const [errors, setErrors] = useState(defaultErrors)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [post, setPost] = useState([]);

  const handleChanges = (event) => {
    const { name, value } = event.target
    validate(name, value)
    setFormValues({ ...formValues, [name]: event.target.type === "checkbox" ? event.target.checked : event.target.value })
  }

  const submit = (event) => {
    event.preventDefault();

    axios.post('https://reqres.in/api/users', formValues).then((response) => {
      setPost(response.data)
      console.log(response.data)
    })

    // Packaging data to put onto state
    const newData = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      agree: ['agree'].filter(item => formValues[item]),
    };
    setSavedFormInfo([...savedFormInfo, newData]);
    setFormValues(defaultValues);
  }

  const validate = (name, value) => {
    yup.reach(formSchema, name).validate(value).then((valid) => {
        setErrors({...errors, [name]: ''})
    }).catch((err) => {
        setErrors({...errors, [name]: err.errors[0] })
    })
  }

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
        setButtonDisabled(!valid)
    })
  }, [formValues])
  
  

  return (
    <div className="App">
      <Form formValues={formValues} handleChanges={handleChanges} submit={submit} buttonDisabled={buttonDisabled} errors={errors}/>
    </div>
  );
}

export default App;
