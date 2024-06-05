import React from 'react';
import HomePage from './pages/HomePages';
import MainLayout from './layouts/MainLayout';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import JobsPages from './pages/JobsPages';
import NotFoundPage from './pages/NotFoundPage';
import JobPage ,{jobLoader} from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
//add the job
  const addJob = async (newJob) => {
    console.log(newJob);
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  //delete the job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };

//update the job
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return;
  };
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>} >
           <Route index element={<HomePage/>} />
           <Route path='/jobs' element={<JobsPages/>} />
           <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>} />
           <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
           <Route path='/jobs/:id' element={<JobPage  deleteJob={deleteJob} />}  loader={jobLoader}/>
           <Route path='*' element={<NotFoundPage/>} />
  
      </Route>
    )
  );
  return (
    
    <RouterProvider router={router}/>
  );
};

export default App;
