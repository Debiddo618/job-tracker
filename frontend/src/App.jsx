import { useState, useEffect } from 'react';
import * as jobService from "./services/jobService";
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';

const App = () => {
  const [jobList, setJobList] = useState([]);
  const [selected, setSelected] = useState(null);


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await jobService.index();
        if (jobs.error) {
          throw new Error(pets.error);
        }
        setJobList(jobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  const updateSelected = (pet) => {
    setSelected(pet)
  }
  
  return (
    <>
      <JobList jobList={jobList} updateSelected={updateSelected} />
      <JobDetail selected={selected}/>
    </>
  )

};

export default App;