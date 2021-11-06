import './App.css';
import {signOut, onAuthStateChanged} from "firebase/auth";
import { auth, db, signInWithGoogle } from "./config/firebase";
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {collection, getDocs, where, query, orderBy} from "firebase/firestore";
import Home from './Home';
import CreateTask from './CreateTask';

function App() {

  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [taskChanges, setTaskChanges] = useState(false);
  
  //get user status
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });


  //get all user task
  useEffect(() => {
    
    const tasksModel = query(collection(db, "tasks"), where("uid", "==", `${user?.uid}`), orderBy("completed"));
    try {
      const getTasks = async () => {
        const data = await getDocs(tasksModel);
        setTasks(data.docs.map(doc => (
          {
            ...doc.data(),
            id: doc.id
          }
        )));
      }
      getTasks();
      setTaskChanges(false);
    } catch (error) {
      console.log(error.message);
    }
    
  }, [user, taskChanges]);

  //logout
  const logout = async () => {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("profilePic");
      await signOut(auth);
      
  }

  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <div className="row my-2">
            <div className="col-2 profile-pic">
              {user && <img src={localStorage.getItem("profilePic")} alt="profile" />}
            </div>
            <div className="col-7 mt-2">
              <h3>{localStorage.getItem("name")}</h3>
              {/* {user && <h2>{user.email}</h2>} */}
            </div>
            <div className="col-3 mt-2">
              {user ? <button onClick={logout} className="btn btn-sm btn-danger">Logout</button> : <button onClick={signInWithGoogle} className="btn btn-sm btn-success">Login</button>}
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home setTaskChanges={setTaskChanges} id={user?.uid} tasks={tasks} />} />
          <Route path="/create" element={<CreateTask id={user?.uid} setTaskChanges={setTaskChanges} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
