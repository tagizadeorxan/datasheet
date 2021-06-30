import { useState } from "react"
import "./employees.css"

const Employees = () => {
    const [page, setPage] = useState(0)
    const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem("employees")).filter(e => e.active === 1).slice(page, page + 2))
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [birthday, setBirthday] = useState()
    const [position, setPosition] = useState()
    const [phone_number, setPhoneNumber] = useState()
    const [id, setID] = useState()
    const [status, setStatus] = useState(1)




    const editEmployee = (e) => {
        if (e.id === id) {
            let update = {}

            update.id = e.id
            name ? update.name = name : update.name = e.name
            surname ? update.surname = surname : update.surname = e.surname
            birthday ? update.birthday = birthday : update.birthday = e.birthday
            position ? update.position = position : update.position = e.position
            phone_number ? update.phone_number = phone_number : update.phone_number = e.phone_number
            update.active = 2

            const data = JSON.parse(localStorage.getItem("employees"))
            let result = data.map(employee => {
                if (employee.id === update.id) {
                    employee = { ...employee, ...update }
                }
                return employee
            })
            setEmployees(result)
            localStorage.setItem("employees", JSON.stringify(result))
        }
    }

    const changeDataByStatus = (status) => {
        const data = JSON.parse(localStorage.getItem("employees"))
        let result = data.filter(employee =>
            Number(employee.active) === Number(status)
        )
        setPage(0)
        setEmployees(result.slice(0, 2))
    }

    const changePage = (direction) => {
        switch (direction) {
            case 'left':
                if (page > 0) {
                    setEmployees(JSON.parse(localStorage.getItem("employees")).filter(e => Number(e.active) === Number(status)).slice(page - 2, page))
                    setPage(page - 2)
                }
                break;
            case 'right':
                if (page + 2 < JSON.parse(localStorage.getItem("employees")).filter(e => Number(e.active) === Number(status)).length) {
                    setEmployees(JSON.parse(localStorage.getItem("employees")).filter(e => Number(e.active) === Number(status)).slice(page + 2, page + 4))
                    setPage(page + 2)
                }

                break;
            default:
                break;
        }
    }

    const removeActionEmployee = (employeeID) => {
        const data = JSON.parse(localStorage.getItem("employees"))
        let result = data.map(employee => {
            if (employee.id === employeeID) {
                if (Number(status) !== 0) {
                    employee.active = 0
                } else {
                    employee.active = 1
                }
            }
            return employee
        })
        setEmployees(result)
        localStorage.setItem("employees", JSON.stringify(result))
    }

    return (
        <div className="employees">

            <select onChange={(e) => { setStatus(e.target.value); changeDataByStatus(e.target.value) }}>
                <option value="1">employees</option>
                <option value="2">updated</option>
                <option value="0">removed</option>
            </select>
            {employees && employees.length > 0 ? <div>

                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>surname</th>
                            <th>birthday</th>
                            <th>position</th>
                            <th>phone number</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {status && employees.map(e =>
                            e.active === Number(status) ? <tr key={e.id}>
                                <td>
                                    <input id="name" pattern="[a-zA-Z]{1,15}" required title="only letters,no space" defaultValue={e.name} onChange={(event) => { setName(event.target.value); setID(e.id) }} />
                                </td>
                                <td>
                                    <input id="surname" required pattern="[a-zA-Z]{1,15}" title="only letters,no space" defaultValue={e.surname} onChange={(event) => { setSurname(event.target.value); setID(e.id) }} />
                                </td>
                                <td>
                                    <input type="date" id="birthday" required defaultValue={e.birthday} onChange={(event) => { setBirthday(event.target.value); setID(e.id) }} />
                                </td>
                                <td>
                                    <input id="position" required defaultValue={e.position} onChange={(event) => { setPosition(event.target.value); setID(e.id) }} />
                                </td>
                                <td>
                                    <input type="tel" id="phone_number" required pattern="^\d{12}$" title="format:994556005040" defaultValue={e.phone_number} onChange={(event) => { setPhoneNumber(event.target.value); setID(e.id) }} />
                                </td>
                                <td>
                                    <button className="buttonClass" onClick={() => editEmployee(e)}>update</button>
                                    <button className="buttonClass" onClick={() => removeActionEmployee(e.id)}>{Number(status) === 0 ? 'unremove' : 'remove'}</button>
                                </td>
                            </tr> : null


                        )}
                    </tbody>
                </table>
            </div> : <p>0 employees</p>}

            {employees && employees.length > 0 ? <div className="pagination">
                <button className="buttonClass" onClick={() => changePage('left')}>left</button>
                <button className="buttonClass" onClick={() => changePage('right')}>right</button>
            </div> : null}


        </div>

    )
}


export default Employees