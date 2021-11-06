import { useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "./config/firebase";
// import { useNavigate } from "react-router";

const CreateTask = ({id, setTaskChanges, isOpen, setIsOpen}) => {

    const [taskName, setTaskName] = useState('');
    const userRef = collection(db, "tasks");
    // const navigate = useNavigate();

    const createTask = async (event) => {
        event.preventDefault();
        await addDoc(userRef, {task_name: taskName, completed: false, uid: id});
        setTaskName('');
        setTaskChanges(true);
        setIsOpen(false);
        // navigate('/');
    }
    const MODAL_STYLES = {
        position: 'fixed',
        width: '90%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        padding: '50px',
        zIndex: 1000
      }
    
    if (!isOpen) return null;

    return ( 
        <div style={MODAL_STYLES} className="container create-task">
            <div className="row close-row">
                    <i onClick={() => setIsOpen(false)} className="far fa-times-circle close-btn"></i>
            </div>
            <div className="row">
                <div className="col m-auto">
                    <h1>Create Task</h1>
                </div>
                <form>
                    <div className="mb-3">
                        <input value={taskName} onChange={(e) => setTaskName(e.target.value)} type="text" className="form-control d-inline" aria-describedby="emailHelp" />
                    </div>
                    <div>
                        <button onClick={createTask} type="submit" className="btn btn-primary d-inline">Submit</button>
                    </div>
                </form>
                <div>
                </div>
            </div>
        </div>
     );
}
 
export default CreateTask;