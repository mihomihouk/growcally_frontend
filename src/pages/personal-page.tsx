import React from 'react';
import { Layout } from './layout';
import { ProfileEditor } from '../container/profile-editor';
import { ProfileDisplay } from '../container/profile-display';

export const PersonalPage = () => {
  const [showEditor, setEditor] = React.useState<boolean>(false);
  return (
    <Layout>
      {!showEditor ? (
        <ProfileDisplay setEditor={() => setEditor(true)} />
      ) : (
        <ProfileEditor setEditor={() => setEditor(false)} />
      )}
    </Layout>
  );
};
