import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";

function App() {
  const [view, setView] = useState("login");
  const [username, setUsername] = useState("");

  const handleLogin = (user) => {
    setUsername(user);
    setView("dashboard");
  };

  if (view === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onRegister={() => setView("register")}
        onForgot={() => setView("forgot")}
      />
    );
  }

  if (view === "register") {
    return (
      <Register
        onBack={() => setView("login")}
        onRegistered={() => setView("login")}
      />
    );
  }

  if (view === "forgot") {
    return <ForgotPassword onBack={() => setView("login")} />;
  }

  return (
    <Dashboard
      username={username}
      onLogout={() => {
        setUsername("");
        setView("login");
      }}
    />
  );
}

export default App;
