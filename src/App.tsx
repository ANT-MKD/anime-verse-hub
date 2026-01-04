import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProfileProvider } from "@/contexts/UserProfileContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import AnimeCharacters from "./pages/AnimeCharacters";
import CharacterProfile from "./pages/CharacterProfile";
import AnimesPage from "./pages/AnimesPage";
import CharactersPage from "./pages/CharactersPage";
import FavoritesPage from "./pages/FavoritesPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import ComparatorPage from "./pages/ComparatorPage";
import QuizPage from "./pages/QuizPage";
import BattleSimulator from "./pages/BattleSimulator";
import TimelinePage from "./pages/TimelinePage";
import TierListPage from "./pages/TierListPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import AIChatbot from "./components/AIChatbot";
import RandomCharacterButton from "./components/RandomCharacterButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserProfileProvider>
        <TooltipProvider>
          <FavoritesProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                <Route path="/animes" element={<ProtectedRoute><AnimesPage /></ProtectedRoute>} />
                <Route path="/characters" element={<ProtectedRoute><CharactersPage /></ProtectedRoute>} />
                <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
                <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
                <Route path="/comparator" element={<ProtectedRoute><ComparatorPage /></ProtectedRoute>} />
                <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
                <Route path="/battle" element={<ProtectedRoute><BattleSimulator /></ProtectedRoute>} />
                <Route path="/timeline" element={<ProtectedRoute><TimelinePage /></ProtectedRoute>} />
                <Route path="/tierlist" element={<ProtectedRoute><TierListPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/anime/:animeId" element={<ProtectedRoute><AnimeCharacters /></ProtectedRoute>} />
                <Route path="/anime/:animeId/character/:characterId" element={<ProtectedRoute><CharacterProfile /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <AIChatbot />
              <RandomCharacterButton />
            </BrowserRouter>
          </FavoritesProvider>
        </TooltipProvider>
      </UserProfileProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
