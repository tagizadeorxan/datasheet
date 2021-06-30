import { useRef } from 'react'
import './employee.css'

const Employee = (props) => {

    const name = useRef()
    const surname = useRef()
    const birthday = useRef()
    const position = useRef()
    const phone_number = useRef()

    const addEmployee = (e) => {
        e.preventDefault()
        let newData = []

        let result = localStorage.getItem('employees')
        if (result !== null) {
            let oldData = JSON.parse(result)
            newData = oldData
        }

        newData.push({
            id: result !== null ? newData.length + 1 : 1,
            name: name.current.value,
            surname: surname.current.value,
            birthday: birthday.current.value,
            position: position.current.value,
            phone_number: phone_number.current.value,
            active: 1
        })

        localStorage.setItem("employees", JSON.stringify(newData))
        props.setNav('')
    }


    return (
        <form onSubmit={addEmployee}>

            <div className="form-table">

                <div className="input-group">
                    <label htmlFor="name">name: </label>
                    <input ref={name} id="name" pattern="[a-zA-Z]{1,15}" required title="only letters,no space" />
                </div>
                <div className="input-group">
                    <label htmlFor="surname">surname: </label>
                    <input ref={surname} id="surname" required pattern="[a-zA-Z]{1,15}" title="only letters,no space" />
                </div>
                <div className="input-group">
                    <label htmlFor="birthday">date of birth: </label>
                    <input type="date" ref={birthday} id="birthday" required />
                </div>
                <div className="input-group">
                    <label htmlFor="position">position: </label>
                    <input ref={position} id="position" required />
                </div>
                <div className="input-group">
                    <label htmlFor="phone_number">phone number: </label>
                    <input type="tel" ref={phone_number} id="phone_number" required pattern="^\d{12}$" title="format:994556005040" />
                </div>
                <button type="submit" >Add</button>
                <button onClick={() => props.setNav('')}>Close</button>
            </div>

        </form>
    )
}

export default Employee