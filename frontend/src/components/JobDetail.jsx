import Button from "react-bootstrap/esm/Button";
import Alert from 'react-bootstrap/Alert';

const JobDetail = (props) => {
    if (!props.selected)
      return (
        <Alert variant="light" className="w-75 mx-auto my-3">
        <Alert.Heading className="text-center">Create or Select a Job to see more details.</Alert.Heading>

      </Alert>
  
      );
    return (
      <div className="card w-75 mx-auto my-3">
        <h5 className="card-header">{props.selected.type} {props.selected.title} at {props.selected.company_name} (${props.selected.salary.toLocaleString()})</h5>
        <div className="card-body">
          <h5 className="card-title">Location: {props.selected.job_location}</h5>
          <p className="card-text">Description: {props.selected.description}</p>

          <div className="d-flex justify-content-center">
            <Button className="btn-secondary m-1 w-25" onClick={() => props.handleFormView(props.selected)}>
              Edit
            </Button>
            <Button className="btn-danger m-1 w-25" onClick={() => props.handleRemoveJob(props.selected.id)}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default JobDetail;
  