import { Route, Routes } from "react-router-dom";
import DashBoardPage from "./components/page/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import EventPage from "./components/page/EventPage";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<DashBoardPage />} path="/" />
        <Route element={<EventPage />} path={`event/:eventid`} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
