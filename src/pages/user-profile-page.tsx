import React from 'react';
import { Layout } from './layout';
import { ProfileEditor } from '../container/profile-editor';
import { ProfileDisplay } from '../container/profile-display';

export const UserProfilePage = () => {
  const [showEditor, setEditor] = React.useState<boolean>(false);
  return (
    <Layout>
      <div className="ml-1 md:!ml-16 lg:!ml-64 pt-10 px-2 md:px-12 w-full">
        {!showEditor ? (
          <ProfileDisplay setEditor={() => setEditor(true)} />
        ) : (
          <ProfileEditor setEditor={() => setEditor(false)} />
        )}
      </div>
    </Layout>
  );
};
