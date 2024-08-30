import { useState } from 'react';

const JobForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    company_name: '',
    job_location: '',
    type: 'Full-time',
    description: '',
    salary: 0,
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    props.handleAddJob(formData);
    setFormData({     
        title: '',
        company_name: '',
        job_location: '',
        type: 'Full-time',
        description: '',
        salary: 0
    });

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
        <button type="submit">Add New Job</button>
      </form>
    </div>
  );
};

export default JobForm;
