
import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import AdminDashboard from '@/components/AdminDashboard';
import ManagerDashboard from '@/components/ManagerDashboard';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (role, username) => {
    setUser({ role, username });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : user.role === 'admin' ? (
        <AdminDashboard username={user.username} onLogout={handleLogout} />
      ) : (
        <ManagerDashboard username={user.username} onLogout={handleLogout} />
      )}
      <Toaster />
    </div>
  );
}

export default App;
