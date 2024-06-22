function Loading() {
  return (
    <div className="loading-container">
      <div
        className="spinner-border m-auto"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
