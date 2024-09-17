import "./SearchPost.css"
export const SearchPost = ({ setSearchTerm }) => {
  return (
    <>
      <input
        className="search-input"
        type="search"
        id="title"
        name="title"
        placeholder="Search Posts"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </>
  );
};
