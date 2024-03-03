
import Image from 'next/image';
import React from 'react';

interface UserDataprops {
  id: string;
  email: string;
  imageUrl: string | null;
}

const UsersData = ({ email, imageUrl }: UserDataprops) => {
  return (
    <div className="flex justify-between items-center gap-5">
      <div className="w-10 h-10 relative rounded-full overflow-hidden">
        {imageUrl && <Image unoptimized={true} className="rounded-full object-cover" fill src={imageUrl} alt="user_profile" />}
      </div>
      <h1 className="text-sm text-slate-600">{email}</h1>
    </div>
  );
};

export default UsersData;