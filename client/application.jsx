import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage";
import { ProfilePage } from "./pages/profilePage";
import { LoginPage } from "./pages/loginPage";
import { NewsArticles } from "./pages/newsArticles";
import { useLoading } from "./misc/useLoading";
import { LoginApiContext } from "./apiContext/loginApiContext";
import { PublishPage } from "./pages/publishPage";

export const Application = () => {
  const { fetchLogin } = useContext(LoginApiContext);
  const { data, error, loading, reload } = useLoading(() => {
    console.log("Fetching");
    return fetchLogin();
  });
  console.warn("data", data);

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  if (loading) {
    return <div>Please wait...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={<FrontPage user={data?.user} reload={reload} />}
        />
        <Route path={"/news"} element={<NewsArticles user={data?.user} />} />
        <Route
          path={"/news/publish"}
          element={<PublishPage user={data?.user} />}
        />
        <Route
          path={"/login/*"}
          element={<LoginPage config={data?.config} reload={reload} />}
        />
        <Route path={"/profile"} element={<ProfilePage user={data?.user} />} />
      </Routes>
    </BrowserRouter>
  );
};
