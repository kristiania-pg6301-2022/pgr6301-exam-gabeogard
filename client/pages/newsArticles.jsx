import { NavBar, NavBarLogged } from "../components/TopBar";
import { useContext, useEffect, useState } from "react";
import { ArticleApiContext } from "../apiContext/articleApiContext";
import { useLoading } from "../misc/useLoading";
import { useNavigate } from "react-router-dom";

function Article(props) {
  const { deleteArticle } = useContext(ArticleApiContext);
  const navigate = useNavigate();
  const title = props.title;
  function handleDelete() {
    deleteArticle({ title });
    window.location.href = "/news";
  }

  return (
    <div className={"news-article"} key={"article"}>
      <h3>{props.title}</h3> <button onClick={handleDelete}>Delete</button>
      <h4>Category - {props.category}</h4>
      <h5>Author - {props.auth}</h5>
      <p>{props.content}</p>
    </div>
  );
}

function CategorySection(data) {
  return null;
}

function ReadOnlyArticle(props) {
  return (
    <div className={"news-article"} key={"article"}>
      <h4>Category - {props.category}</h4>
      <h5>Author - {props.auth}</h5>
      <p>{props.content}</p>
    </div>
  );
}

export function NewsArticles({ user }) {
  const { listArticles } = useContext(ArticleApiContext);
  const { data, error, loading, reload } = useLoading(listArticles);
  const [dataSet, setDataSet] = useState(data);
  useEffect(async () => {
    if (dataSet === undefined) {
      setDataSet(data);
    }
  });

  if (error) {
    return <div>Error occurred while loading: {error.toString()}</div>;
  }
  if (loading) {
    return <div>Please wait...</div>;
  }

  function pickCategory(category, data) {
    const filtered = [];
    for (let i in data) {
      console.log(data[i].category);
      if (data[i].category === category) {
        filtered.push(data[i]);
      }
    }
    console.log(filtered);
    console.log(dataSet);
    return filtered;
  }

  const categorySet = [];
  data?.map((article) => categorySet.push(article.category));
  const finalCategories = [...new Set(categorySet)];
  if (user?.google !== undefined) {
    return (
      <div>
        <NavBarLogged />
        <div className={"grid-container"}>
          <div className={"filter-section"}>
            <div className={"category_select"}>
              Articles in selected category ({dataSet?.length || 0})
              <p className={"category_name"} onClick={() => setDataSet(data)}>
                All
              </p>
              {finalCategories.map((category) => (
                <p
                  className={"category_name"}
                  onClick={() => setDataSet(pickCategory(category, data))}
                >
                  {category}
                </p>
              ))}
            </div>
          </div>
          <div className={"news-section"}>
            {dataSet?.map((article) => (
              <Article
                title={article.title}
                category={article.category}
                content={article.content}
                auth={article.author}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
        <div className={"grid-container"}>
          <div className={"filter-section"}>
            <div className={"category_select"}>
              Articles in selected category ({dataSet?.length || 0})
              <p className={"category_name"} onClick={() => setDataSet(data)}>
                All
              </p>
              {finalCategories.map((category) => (
                <p
                  className={"category_name"}
                  onClick={() => setDataSet(pickCategory(category, data))}
                >
                  {category}
                </p>
              ))}
              ;
            </div>
          </div>
          <div className={"news-section"}>
            {dataSet?.map((article) => (
              <ReadOnlyArticle
                title={article.title}
                category={article.category}
                content={article.content}
                auth={article.author}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
