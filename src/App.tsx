import { BrowserRouter, Route, Routes } from "react-router";
import { SignInPage } from "./pages/signInPage";
import { Toaster } from "./components/ui/sonner";
import { SignUpPage } from "./pages/signUpPage";
import { HomePage } from "./pages/homePage";

function App() {
  return (
    <div className="flex min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
        <Toaster position="top-center" />
      </BrowserRouter>
    </div>
  );
}

export default App;
