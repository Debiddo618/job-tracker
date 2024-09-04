import Button from "react-bootstrap/esm/Button";
import Alert from 'react-bootstrap/Alert';
import { useContext } from "react";
import { AuthedUserContext } from "../App";


const JobList = (props) => {
    const user = useContext(AuthedUserContext);

    return (
        <div className="container-fluid w-75">
            <h1 className="text-center">My Job Applications</h1>
            {!props.jobList.length ? 
                (
                    <Alert variant="success">
                    <Alert.Heading>Hey, {user.username} </Alert.Heading>
                    <p>
                        I developed a single-page application to efficiently manage and track my job applications. The frontend leverages JavaScript, React, and Bootstrap to provide a responsive and interactive user experience. The backend is powered by Python, Flask, and PostgreSQL, ensuring robust data management and seamless integration.
                    </p>
                    <hr />
                    <p className="mb-0">
                        It looks like you don't have any job applications yet. Create a new job application using the button below.
                    </p>
                  </Alert>
                ) :
                (
            <table className="table">
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
                    <tr key={index}>
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
