import "./FiltersSideBar.css";

export default function FiltersSideBar() {
    return (
        <div className="sidebar">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="PESQUISA"
                    className="search-input"
                />
            </div>
            <div className="filter-box">
                <h3>Languages</h3>
            </div>
            <div className="filter-box">
                <h3>Years</h3>
            </div>
        </div>
    );
}
