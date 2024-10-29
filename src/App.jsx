import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import { AuthProvider } from "./context/AuthContex";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <main className="m-5 py-2 px-6 min-h-screen max-w-screen-2xl font-primary ">
          <Outlet />
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
