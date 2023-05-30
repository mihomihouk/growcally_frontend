import React from 'react';
import { Button } from '../components/button';
import { TextArea } from '../components/textarea';
import { WordCounter } from '../components/word-counter';
import { updateProfile } from '../api/auth.service';
import { useAppSelector } from '../hooks/hooks';
import { PlusIcon } from '@heroicons/react/24/outline';

interface ProfileEditorProps {
  setEditor: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ setEditor }) => {
  const [bio, setBio] = React.useState<string>('');
  const [thumbnail, setThumbnail] = React.useState<File>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [wordCountError, setWordCountError] = React.useState<boolean>(false);
  const currentUser = useAppSelector((state) => state.auth.user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!currentUser) {
      return;
    }
    const { isSuccess, alertMessage } = await updateProfile({
      thumbnail,
      bio,
      userId: currentUser.id
    });
    if (!isSuccess) {
      alert(alertMessage);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setBio('');
    setEditor(false);
  };

  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setThumbnail(file);
  };

  const fullName = `${currentUser?.givenName} ${currentUser?.familyName}`;

  return (
    <div>
      <p className="text-xl font-semibold pb-10">Edit Profile</p>
      <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit}>
        <div className="flex w-full items-center">
          <div className="w-1/3">
            <div className="relative w-24 h-24 bg-gray-300 rounded-full border-2 border-gray-500">
              {thumbnail ? (
                <>
                  <label
                    htmlFor="profilePhotoInput"
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                  >
                    <img
                      className="rounded-full object-cover h-24 w-24"
                      src={URL.createObjectURL(thumbnail)}
                      alt="profile"
                    />
                    <input
                      type="file"
                      id="profilePhotoInput"
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={(e) => handleProfilePhotoUpload(e)}
                    />
                    <span className="sr-only">Change profile photo</span>
                  </label>
                </>
              ) : (
                <>
                  <label
                    htmlFor="profilePhotoInput"
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                  >
                    <input
                      type="file"
                      id="profilePhotoInput"
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={(e) => handleProfilePhotoUpload(e)}
                    />
                    <span aria-hidden="true">
                      <PlusIcon className="w-6 h-6 text-gray-500 cursor-pointer" />
                    </span>
                    <span className="sr-only">Upload profile photo</span>
                  </label>
                </>
              )}
            </div>
          </div>
          <p className="w-2/3">{fullName}</p>
        </div>
        <div className="flex w-full">
          <label className="w-1/3" htmlFor="biography">
            <p className="text-lg">About me</p>
          </label>
          <div className="w-2/3">
            <TextArea
              placeholder="Tell us about yourself"
              id="biography"
              name="biography"
              hasError={wordCountError}
              errorMessage="It should be no more than 150 words."
              value={bio}
              className="p-2 outline-none border border-gray-500 rounded-md h-60"
              onChange={(e) => setBio(e.target.value)}
            />
            <WordCounter
              value={bio}
              className="flex justify-end"
              max={150}
              setError={setWordCountError}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            isPrimary
            className="w-full md:w-1/5"
            disabled={(!bio && !thumbnail) || wordCountError}
            isLoading={isLoading}
          >
            Change
          </Button>
        </div>
      </form>
    </div>
  );
};
