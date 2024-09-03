import Button from "react-bootstrap/esm/Button";

const JobDetail = (props) => {
    if (!props.selected)
      return (
        <div>
          <h1>NO DETAILS</h1>
        </div>
      );
    return (
      <div>
        <h1>{props.selected.title}</h1>
        <h2>Company Name: {props.selected.company_name}</h2>
        <h2>
          Location: {props.selected.job_location}
        </h2>
        <h3>Type: {props.selected.type}</h3>
        <h4>Description: {props.selected.description}</h4>
        <h4>Salary: {props.selected.salary}</h4>
        <Button className="btn-secondary mx-1" onClick={() => props.handleFormView(props.selected)}>
          Edit
        </Button>
        <Button className="btn-danger" onClick={() => props.handleRemoveJob(props.selected.id)}>
          Delete
        </Button>
      </div>
    );
  };
  
  export default JobDetail;
  