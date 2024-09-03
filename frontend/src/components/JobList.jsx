import Button from "react-bootstrap/esm/Button";
const JobList = (props) => {
    return (
        <div className="container-fluid">
            <h1 className="text-center">My Job Applications</h1>
            {!props.jobList.length ? <h2>No Jobs Yet!</h2> : (
                <ul>
                    {props.jobList.map((job, index) => (
                        <li key={job._id || index}>
                            <a onClick={() => props.updateSelected(job)}>
                                {job.title}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
            <div className="d-flex justify-content-center mt-3">
                <Button className="w-50" onClick={props.handleFormView}>
                    {props.isFormOpen ? 'Close Form' : 'New Job'}
                </Button>
            </div>
        </div>
    );
}

export default JobList;
