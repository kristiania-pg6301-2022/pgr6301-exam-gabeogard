<<<<<<< Updated upstream
import {useContext, useState} from "react";
import {ArticleApiContext} from "../apiContext/articleApiContext";
import {useNavigate} from "react-router-dom";
import {NavBarLogged} from "../components/TopBar";

function FormInput({label, value, onChangeValue}) {
    return <div className="form-input">
        <label>
            <strong>{label}</strong>{" "}
            <input value={value} onChange={(e) => onChangeValue(e.target.value)}/>
        </label>
    </div>
}

function BodyFormInput({label, value, onChangeValue}) {
    return <div className="form-input">
        <label>
            <strong>{label}</strong>{" "}
            <textarea value={value}
                      onChange={(e) => onChangeValue(e.target.value)} rows={10} cols={50}/>
        </label>
    </div>
}

export function PublishPage() {
    const {createArticle} = useContext(ArticleApiContext);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        createArticle({
            title,
            category,
            content,
            author
        });
        window.location.href="/news"
    }

    return (
        <div>
            <NavBarLogged/>
            <div className={"publish-article"}>
            <form onSubmit={handleSubmit}>
                <h1>Write and publish your article</h1>

                <FormInput label={"Title:"} value={title} onChangeValue={setTitle}/>
                <FormInput label={"Category:"} value={category} onChangeValue={setCategory}/>
                <BodyFormInput
                    label={"Article:"}
                    value={content}
                    onChangeValue={setContent}
                    height={"150px"}
                />
                <FormInput label={"Author:"} value={author} onChangeValue={setAuthor}/>
                <div>
                    <button>Publish article</button>
                </div>
            </form>
            </div>
        </div>
    );
=======
import {useContext, useState} from "react";
import {ArticleApiContext} from "../apiContext/articleApiContext";
import {useNavigate} from "react-router-dom";
import {NavBarLogged} from "../components/TopBar";

function FormInput({label, value, onChangeValue}) {
    return <div className="form-input">
        <label>
            <strong>{label}</strong>{" "}
            <input value={value} onChange={(e) => onChangeValue(e.target.value)}/>
        </label>
    </div>
}

export function PublishPage() {
    const {createArticle} = useContext(ArticleApiContext);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        createArticle({
            title,
            category,
            content,
            author
        });
        navigate("/news")
    }

    return (
        <div>
            <NavBarLogged/>
            <div className={"publish-article"}>
            <form onSubmit={handleSubmit}>
                <h1>Write and publish your article</h1>

                <FormInput label={"Title:"} value={title} onChangeValue={setTitle}/>
                <FormInput label={"Category:"} value={category} onChangeValue={setCategory}/>
                <FormInput
                    label={"Article:"}
                    value={content}
                    onChangeValue={setContent}
                    height={"150px"}
                />
                <FormInput label={"Author:"} value={author} onChangeValue={setAuthor}/>
                <div>
                    <button>Publish article</button>
                </div>
            </form>
            </div>
        </div>
    );
>>>>>>> Stashed changes
}