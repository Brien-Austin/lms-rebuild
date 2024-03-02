import { db } from '@/lib/db';
import React, { useEffect, useState } from 'react';
import RequestList from './_components/RequestList';

const Users = async () => {
  const requests = await db.requestAcess.findMany({
    where : {
      courseAccess : {
          isGivenAccess : false
      }
  },
  include : {
    courseAccess : true
  }
  });

  

  console.log(requests);
  return (
    <div className='flex flex-col gap-5 mt-10'>
      {
        requests.length === 0 && (
          <>
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          No <span className='font-semibold text-center'>Course Access Requests</span> at the moment !
          </h1></>
        )
      }
      {requests.map((req) => (
        <div key={req.id}>
          {req.courseAccess?.courseId !== null && req.courseAccess?.courseId !== undefined && (
            <RequestList id={req.courseAccess.courseId} courseId={req.courseAccess.courseId} userId={req.userId}email={req.emailAddress} courseName={req.courseAccess.courseId} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Users;
