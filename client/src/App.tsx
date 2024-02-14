import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Todos } from "./components/Todos";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <h1>TODOs</h1>

      <Todos />

    </QueryClientProvider>
  );
}

export default App;
