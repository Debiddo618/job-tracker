import { useState, useEffect, createContext } from 'react';
import * as jobService from "./services/jobService";
import * as authService from "./services/authService";
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';
import JobForm from './components/JobForm';
import NavBar from './components/NavBar';
import UserForm from './components/UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [jobList, setJobList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mode, setMode] = useState('signup');

  // handle form for user sign-in/sign-out
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (mode) => {
    setShow(true);
    setMode(mode);
  };

  const [user, setUser] = useState(authService.getUser());

  const handleFormView = (job) => {
    setSelected(job?.title ? job : null);
    setIsFormOpen(!isFormOpen);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      let jobs;
      try {
        if(user){
          jobs = await jobService.index(user.id);
          if (jobs.error) {
            throw new Error(jobs.error);
          }
          setJobList(jobs);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);

  const updateSelected = (job) => {
    setSelected(job);
  };

  const handleAddJob = async (formData) => {
    try {
      const newJob = await jobService.create(formData);
      setJobList([newJob, ...jobList]);
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateJob = async (formData, jobId) => {
    try {
      const updatedJob = await jobService.updateJob(formData, jobId);
      if (updatedJob.error) {
        throw new Error(updatedJob.error);
      }
      const updatedJobList = jobList.map((job) =>
        job.id !== updatedJob.id ? job : updatedJob
      );
      setJobList(updatedJobList);
      setSelected(updatedJob);
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveJob = async (jobId) => {
    try {
      const deletedJob = await jobService.deleteJob(jobId);
      if (deletedJob.error) {
        throw new Error(deletedJob.error);
      }
      setJobList(jobList.filter((job) => job.id !== jobId));
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <AuthedUserContext.Provider value={user} className="d-flex justify-content-center align-items-center">
      <NavBar handleShow={handleShow} username={user?.username} handleSignout={handleSignout} />
      <UserForm show={show} handleClose={handleClose} setUser={setUser} mode={mode} />
      {user ? (
        <>
          <JobList 
            jobList={jobList} 
            updateSelected={updateSelected} 
            handleFormView={handleFormView} 
            isFormOpen={isFormOpen}
          />
          {isFormOpen ? (
            <JobForm handleAddJob={handleAddJob} selected={selected} handleUpdateJob={handleUpdateJob} handleFormView={handleFormView} updateSelected={updateSelected} />
          ) : (
            <JobDetail selected={selected} handleFormView={handleFormView} handleRemoveJob={handleRemoveJob} />
          )}
        </>
      ) : (
        <h1>Please Sign In</h1>
      )}
    </AuthedUserContext.Provider>
  );
};

export default App;
