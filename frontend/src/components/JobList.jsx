const JobList = (props) => {
    return (
        <>
            <h1>Job List</h1>
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
            <button onClick={props.handleFormView}>
                {props.isFormOpen ? 'Close Form' : 'New Job'}
            </button>
        </>
    );
}

export default JobList;
