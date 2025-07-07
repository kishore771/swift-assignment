import React, { useState, useEffect } from "react";
import CommentsDashboard from "./components/CommentsDashboard/CommentsDashboard";
import ProfileScreen from "./components/ProfileScreen/ProfileScreen";
import Header from "./components/Header/Header";

function App() {
  const [screen, setScreen] = useState("dashboard");
  const [user, setUser] = useState(null);

  // Optional: preload user data (Ervin Howell)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data[1])); // Ervin Howell
  }, []);

  return (
    <div>
      <Header
        user={user}
        onProfileClick={() => setScreen("profile")}
        />

      {screen === "dashboard" && (
        <CommentsDashboard onViewProfile={() => setScreen("profile")} />
      )}
      {screen === "profile" && (
        <ProfileScreen onBack={() => setScreen("dashboard")} />
      )}
    </div>
  );
}

export default App;
