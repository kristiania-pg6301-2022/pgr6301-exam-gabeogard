import {NavBar, NavBarLogged} from "../components/TopBar";
import {useContext} from "react";
import {ArticleApiContext} from "../apiContext/articleApiContext";
import {useLoading} from "../misc/useLoading";

function Article(props) {
    return (
        <div className={"news-article"} key={"article"}>
            <h3>{props.title}</h3>
            <h4>Category - {props.category}</h4>
            <h5>Author - {props.auth}</h5>
            <p>{props.content}</p>
        </div>
    );
}

export function NewsArticles({user}) {
    const {listArticles} = useContext(ArticleApiContext)
    const {data, error, loading, reload} = useLoading(listArticles)

    if (error){
        return <div>Error occurred while loading: {error.toString()}</div>
    }
    if(loading){
        return <div>Please wait...</div>
    }

    console.log(data)
    if (user?.google !== undefined){
        return (
            <div>
                <NavBarLogged/>
                <div className={"news-section"}>
                    <h1>News</h1>
                    {data?.map((article) => (
                        <Article title={article.title}
                                 category={article.category}
                                 content={article.content}
                                 auth={article.author}/>
                    ))}
                </div>
            </div>
        );
    }else{
        return (
            <div>
                <NavBar/>
                <div className={"news-section"}>
                    <h1>News</h1>
                    {data?.map((article) => (
                        <Article title={article.title}
                                 category={article.category}
                                 content={article.content}
                                 auth={article.author}/>
                    ))}
                </div>
            </div>
        );
    }
}