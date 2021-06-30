import Employee from './components/employee';
import Employees from './components/employees';
import { useState } from 'react'
import './App.css';

let App = () => {

  let [nav, setNav] = useState('employees')

  return (
    <div className="App">
      <div className="nav-menu">
        <button className="buttonClass" onClick={() => setNav('add')}>New Employee</button>
        <button className="buttonClass" onClick={() => setNav('employees')}>Employees</button>
      </div>
      <div>
        {nav === 'add' && <Employee setNav={setNav} />}
        {nav === 'employees' && <Employees />}
      </div>
    </div>
  );
}

export default App;
