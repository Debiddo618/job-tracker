import Button from "react-bootstrap/esm/Button";
const JobList = (props) => {
    return (
        <div className="container-fluid w-75">
            <h1 className="text-center">My Job Applications</h1>
            {!props.jobList.length ? <h2 className="text-center my-3">No Jobs Yet!</h2> : (
            <table class="table">
            <thead>
                <tr>
                <th scope="col">id</th>
                <th scope="col">Job Title</th>
                <th scope="col">Company Name</th>
                <th scope="col">Job Location</th>
                <th scope="col">Description</th>
                <th scope="col">Employment Type</th>
                <th scope="col">Salary</th>
                </tr>
            </thead>
            <tbody>
                {props.jobList.map((job, index) => (
                    <tr>
                        <th scope="row">{job.id}</th>
                        <td>
                            <a className="text-underline" onClick={() => props.updateSelected(job)}>
                                {job.title}
                            </a>
                        </td>
                        <td>{job.company_name}</td>
                        <td>{job.job_location}</td>
                        <td>{job.description}</td>
                        <td>{job.type}</td>
                        <td>${job.salary.toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
            </table>
            )}

            <div className="d-flex justify-content-center mt-3">
                <Button className="w-50 my-3" onClick={props.handleFormView}>
                    {props.isFormOpen ? 'Close Form' : 'New Job Application'}
                </Button>
            </div>
        </div>
    );
}

export default JobList;
