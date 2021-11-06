import { db } from "./config/firebase";
import {updateDoc, deleteDoc, doc} from "firebase/firestore";
import { useState } from "react";
import CreateTask from "./CreateTask";
const Home = ({tasks, setTaskChanges, id}) => {

    const [show, setShow] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const completeTask = async (id) => {
        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, {completed: true});
        setShow('');
        setTaskChanges(true);
    }

    const deleteTask = async (id) => {
        const taskRef = doc(db, 'tasks', id);
        await deleteDoc(taskRef);
        setTaskChanges(true);
    }

    const homeFunction = () => {
        console.log("home");
    }

    return ( 
        <div className="container home" onClick={homeFunction}>
            {tasks.map(task => (
            <div key={task.id} className={`row ${task.id === show ? `mark` : ``}`}>
                    <div className="col-1">
                        <i onClick={() => completeTask(task.id)} className="far fa-circle"></i>
                    </div>
                    <div onClick={() => setShow(task.id)} className="col task-name">
                        <h3 className={`pt-1 ${task.completed ? `completed` : ``}` }> {task.task_name}</h3>
                    </div>
                    <div onClick={() => deleteTask(task.id)} className={`col-1 ${task.id === show ? `` : `hidden-icon`}`}>
                        <div className="delete-btn"><i className="far fa-trash-alt"></i></div>
                    </div>
                </div>
            ))}
            <div className="row add-btn mx-3 pb-3">
                    {/* <a href="/create" className="btn"><i className="fas fa-plus add-button"></i></a> */}
                    <button className="btn" onClick={() => setIsOpen(true)}><i className="fas fa-plus add-button"></i></button>
            </div>
            <CreateTask id={id} setTaskChanges={setTaskChanges} isOpen={isOpen} setIsOpen={setIsOpen} />
            <div onClick={() => setShow('')} className="empty-space">

            </div>
        </div>
        
     );
}
 
export default Home;