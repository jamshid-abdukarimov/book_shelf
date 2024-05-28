import { AppRouter } from "app/routers";
import "./App.css";
import { Providers } from "app/providers";

function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
