import { useState, useContext } from 'react';
import { AuthedUserContext } from '../App';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const JobForm = (props) => {
  const user = useContext(AuthedUserContext);

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
    if (props.selected) {
      props.handleUpdateJob(formData, props.selected.id);
    } else {
      props.handleAddJob(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmitForm} className='w-50 mx-auto'>
      <Form.Group className="mb-3" controlId="title" >
          <Form.Label>Job Title</Form.Label>
          <Form.Control 
              type="text"
              placeholder="Enter Job Title"
              onChange={handleChange}
              value={formData.title}
              name="title"
              required 
          />
      </Form.Group>

      <Form.Group className="mb-3" controlId="company_name">
          <Form.Label>Company Name</Form.Label>
          <Form.Control 
              type="text"
              placeholder="Enter Company Name" 
              onChange={handleChange}
              value={formData.company_name}
              name="company_name" 
          />
      </Form.Group>
      <Form.Group className="mb-3" controlId="job_location">
          <Form.Label>Job Location</Form.Label>
          <Form.Control 
              type="text"
              placeholder="Enter Job Location" 
              onChange={handleChange}
              value={formData.job_location}
              name="job_location" 
          />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control 
              type="text"
              placeholder="Enter Job Description" 
              onChange={handleChange}
              value={formData.description}
              name="description" 
          />
      </Form.Group>
      <Form.Group className="mb-3" controlId="type">
          <Form.Label>Employment Type</Form.Label>
          <Form.Select>
          <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="salary">
          <Form.Label>Salary</Form.Label>
          <Form.Control 
              type="number"
              placeholder="Enter Desired Annual Salary" 
              onChange={handleChange}
              value={formData.salary}
              name="salary" 
          />
      </Form.Group>

      <Form.Group className="text-center">
        <Button type="submit" className='mt-3 w-100'>
          {props.selected ? 'Update Job' : 'Add New Job'}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default JobForm;
