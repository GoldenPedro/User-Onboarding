import React from 'react';

export default function Form(props) {
    const { formValues, handleChanges, submit, buttonDisabled, errors} = props;


    return (
        <form onSubmit={submit}>
            <label>Name: &nbsp;
                <input name='name' value={formValues.name} onChange={handleChanges} type='text' placeholder='Enter name'/>
            </label>
            <br />
            <label>Email: &nbsp;
                <input name='email' value={formValues.email} onChange={handleChanges} type='text' placeholder='Enter email'/>
            </label>
            <br />
            <label>Password: &nbsp;
                <input name='password' value={formValues.password} onChange={handleChanges} type='text' placeholder='Enter password'/>
            </label>
            <br />
            <label>Agree to Terms of Service: &nbsp;
                <input
                    type="checkbox"
                    name='agree'
                    onChange={handleChanges}
                />
            </label>
            <p>{errors.email}</p>

            <br />
            <button disabled={buttonDisabled}>Submit</button>
        </form>
    )
}