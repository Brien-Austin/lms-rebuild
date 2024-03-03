import { db } from '@/lib/db';
import React from 'react';
import UsersData from './_components/UsersData';

const GrantAccess = async () => {
  const users = await db.users.findMany({});

  return (
    <div className="flex flex-col gap-5 items-center">
      {users.map((user) => (
        <UsersData key={user.id} id={user.id} email={user.email} imageUrl={user.imageUrl} />
      ))}
    </div>
  );
};

export default GrantAccess;