import { useParams } from "react-router-dom";

export default function BlogPost() {
    const params = useParams();
    const { id } = params;

    return <div className="container">This is blog post {id}</div>;
}
