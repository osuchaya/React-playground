const RootPage = ({ children }) => {
  return (
    <main style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {children}
    </main>
  );
};

export default RootPage;
