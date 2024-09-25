import "./App.css";

import { UserProvider } from "./Component/Common/UseContext/useContext";

import AuthRoutes from "./routes/routes";

function App() {
  return (
    <div className="App">
      <UserProvider>
          <AuthRoutes />
      </UserProvider>
    </div>
  );
}

export default App;
