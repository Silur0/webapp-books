import "./CreateBookButton.css";

import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CreateBookButton() {
    const navigate = useNavigate();

    const navigateCreate = () => {
        navigate("/create");
    };

    return (
        <div className="create-book-content-card" onClick={navigateCreate}>
            <FaPlus className="create-book-icon" />
            <div className="create-book-text ">
                <strong>CREATE</strong>
            </div>
        </div>
    );
}
