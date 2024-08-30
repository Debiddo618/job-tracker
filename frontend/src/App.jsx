import { useState, useEffect } from 'react';
import * as jobService from "./services/jobService";
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';
import JobForm from './components/JobForm';

const App = () => {
  const [jobList, setJobList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await jobService.index();
        if (jobs.error) {
          throw new Error(jobs.error);
        }
        setJobList(jobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  const updateSelected = (job) => {
    setSelected(job)
  }

  const handleAddJob = async (formData) => {
    try {
      const newJob = await jobService.create(formData);
      setJobList([newJob, ...jobList]);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  return (
    <>
      <JobList 
        jobList={jobList} 
        updateSelected={updateSelected} 
        handleFormView={handleFormView} 
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <JobForm handleAddJob={handleAddJob}/>
      ) : (
        <JobDetail selected={selected} />
      )}
    </>
  )

};

export default App;