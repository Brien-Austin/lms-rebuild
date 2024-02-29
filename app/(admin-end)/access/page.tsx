import { db } from '@/lib/db';
import React, { useEffect, useState } from 'react';
import RequestList from './_components/RequestList';

const Users = async () => {
  const requests = await db.requestAcess.findMany({
    include: {
      courseAccess: true,
    },
  });

  

  console.log(requests);
  return (
    <div className='flex flex-col gap-5 mt-10'>
      {requests.map((req) => (
        <div key={req.id}>
          {req.courseAccess?.courseId !== null && req.courseAccess?.courseId !== undefined && (
            <RequestList id={req.courseAccess.courseId}  email={req.emailAddress} courseName={req.courseAccess.courseId} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Users;
