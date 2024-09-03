import Button from "react-bootstrap/esm/Button";
const JobList = (props) => {
    return (
        <>
            <h1>My Job Applications</h1>
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
            <Button onClick={props.handleFormView}>
                {props.isFormOpen ? 'Close Form' : 'New Job'}
            </Button>
        </>
    );
}

export default JobList;
