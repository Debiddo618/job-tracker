const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/jobs`;

const index = async (user_id) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${user_id}`);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const create = async (formData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateJob = async (formData, jobId) => {
  try {
    const res = await fetch(`${BASE_URL}/${jobId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteJob = async (jobId) => {
  try {
    const deletedJob = await fetch(`${BASE_URL}/${jobId}`, {
      method: "DELETE",
    });
    return deletedJob.json();
  } catch (err) {
    console.log(err);
  }
};

export { index, create, updateJob, deleteJob };
