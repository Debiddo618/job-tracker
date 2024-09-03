import { useState, useContext } from 'react';
import { AuthedUserContext } from '../App';


const JobForm = (props) => {
  const user = useContext(AuthedUserContext);
  console.log(user.id)

  const initialState = {
    title: '',
    company_name: '',
    job_location: '',
    type: 'Full-time',
    description: '',
    salary: 0,
  }
  const [formData, setFormData] = useState(props.selected ? props.selected : initialState);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    formData.user_id = user.id;
    console.log(formData)
    if (props.selected) {
      props.handleUpdateJob(formData, props.selected.id);
    } else {
      props.handleAddJob(formData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="title"> Title </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="company_name"> Company Name </label>
        <input
          id="company_name"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
        />
        <label htmlFor="job_location"> Job Location </label>
        <input
          id="job_location"
          name="job_location"
          value={formData.job_location}
          onChange={handleChange}
        />
        <label htmlFor="description"> Description </label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="type"> Type </label>
        <select 
            name="type" 
            id="type" 
            onChange={handleChange}
            value={formData.type}
        >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
        </select>
        <label htmlFor="description"> Salary </label>
        <input
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          type="number"
        />
        <button type="submit"> {props.selected ? 'Update Job' : 'Add New Job'} </button>
      </form>
    </div>
  );
};

export default JobForm;
