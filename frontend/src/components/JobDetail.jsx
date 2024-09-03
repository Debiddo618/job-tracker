import Button from "react-bootstrap/esm/Button";

const JobDetail = (props) => {
    if (!props.selected)
      return (
        <div className="my-3">
          <h1 className="text-center">Select or create a job to view details</h1>
        </div>
      );
    return (
      <div class="card w-75 mx-auto my-3">
        <h5 class="card-header">{props.selected.type} {props.selected.title} at {props.selected.company_name} (${props.selected.salary.toLocaleString()})</h5>
        <div class="card-body">
          <h5 class="card-title">Location: {props.selected.job_location}</h5>
          <p class="card-text">Description: {props.selected.description}</p>

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
  