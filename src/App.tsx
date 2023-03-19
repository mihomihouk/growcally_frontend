import React from "react";
import { fetchMedia } from "./api/media.service";
import { Divider } from "./components/divider";
import { DashboardNav } from "./dashboard-nav";
import { Feed } from "./feed";
import "./index.css";

function App() {
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getMedia = async () => {
    setLoading(true);
    const media = await fetchMedia();
    setData(media);
    setLoading(false);
  };
  React.useEffect(() => {
    getMedia();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="h-full mx-auto flex flex-row divide-x">
        <DashboardNav />
        <Feed />
      </div>
    </>
  );
}

export default App;
