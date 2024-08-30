import { useState, useEffect } from 'react';
import * as jobService from "./services/jobService";
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';
import JobForm from './components/JobForm';

const App = () => {
  const [jobList, setJobList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormView = (job) => {
    if (!job.title) setSelected(null);
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
      console.log(error);
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
        <JobForm handleAddJob={handleAddJob} selected={selected} handleUpdateJob={handleUpdateJob} />
      ) : (
        <JobDetail selected={selected} handleFormView={handleFormView} handleRemoveJob={handleRemoveJob}/>
      )}
    </>
  )

};

export default App;