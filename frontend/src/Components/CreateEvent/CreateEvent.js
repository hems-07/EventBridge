import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import Validation from './SignupValidation'
import Axios from 'axios';
//import validation from './LoginValidation';
import ValidationEvent from './ValidationEvent';
import { useLocation } from 'react-router-dom';
import './CreateEvent.css'

function CreateEvent() {
    const location = useLocation();
    const modname = location.state.name;
    const [values,setvalues] = useState({
        title:'',
        name:modname,
        venue:'',
        date:'',
        email:'',
        accommodation:'',
        type:''
    })
    const navigate = useNavigate();
    const [errors,setErrors] = useState({});
    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(ValidationEvent(values));
        
        console.log("This is ",values.title,errors.name,errors.venue,errors.date);
        if(errors.title === "" && errors.name === ""){
            Axios.post('http://localhost:3002/dashboard/createevent',values)
            .then(res => {
                if(res.data === "Success"){
                    navigate('/dashboard/hostedevents',{state: {name: modname}});
                }else{
                    alert("Invalid credentials");
                }
            })
            .catch(err=> console.log(err));
            
        }
    }
    const handleInput = (event) =>{
        setvalues(prev => ({...prev, [event.target.name]: [event.target.value]}));
        
    }
  return (
    <>
    <body>
    <div className='background-image02'>
        <div className='content02'>
            <div className='dv01'>
                <div className='dv12'>
            <form action="" onSubmit={handleSubmit}>
                <h1>Event Details</h1>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong className = "str1">Title</strong></label>
                    <input type="text" placeholder='Enter title' name='title' onChange={handleInput} className='f02'/>
                    {errors.title && <span className='text-danger'>{errors.title}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong className = "str1">Organizer Name</strong></label>
                    <input type="text" placeholder='Enter name' name='name' value={modname} onChange={handleInput} className='f02'/>
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong className = "str1">Venue</strong></label>
                    <input type="text" placeholder='Enter venue' name='venue' onChange={handleInput} className='f02'/>
                    {errors.venue && <span className='text-danger'>{errors.venue}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong className = "str1">Date</strong></label>
                    <input type="text" placeholder='Enter date' name='date' onChange={handleInput} className='f02'/>
                    {errors.date && <span className='text-danger'>{errors.date}</span>}
                    
                </div>
                
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong className = "str1">Organizer Email</strong></label>
                    <input type="email" placeholder='Enter Organizer Email' name='email' onChange={handleInput} className='f02'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong className = "str1">Accommodation</strong></label>
                    <input type="text" placeholder='Accommodation Availability' name='accommodation' onChange={handleInput} className='f02'/>
                    {errors.accommodation && <span className='text-danger'>{errors.accommodation}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong className = "str1">Type</strong></label>
                    <input type="text" placeholder='Enter type of event' name='type' onChange={handleInput} className='f02'/>
                    {errors.type && <span className='text-danger'>{errors.type}</span>}
                    
                </div>
                <button type='submit' className='btn02'><strong>Create Event</strong></button>
                
            </form>
                
                </div>
            </div>
        </div>
    </div>
    </body>
    </>
  )
}

export default CreateEvent;