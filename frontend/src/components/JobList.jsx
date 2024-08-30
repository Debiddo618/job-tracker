const JobList = (props) => {
    const jobs = props.jobList.map((job) => (
        <a key={job._id} onClick={() => props.updateSelected(job)}>
            <li>{job.title}</li>
        </a>
    ));

    return (
        <>
            <h1>Job List</h1>
            {!props.jobList.length ? <h2>No Jobs Yet!</h2> : <ul>{jobs}</ul>}
        </>
    );
}
 
export default JobList;