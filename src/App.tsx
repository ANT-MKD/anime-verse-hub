import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProfileProvider } from "@/contexts/UserProfileContext";
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
                <Route path="/" element={<Index />} />
                <Route path="/animes" element={<AnimesPage />} />
                <Route path="/characters" element={<CharactersPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/comparator" element={<ComparatorPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/battle" element={<BattleSimulator />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/tierlist" element={<TierListPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/anime/:animeId" element={<AnimeCharacters />} />
                <Route path="/anime/:animeId/character/:characterId" element={<CharacterProfile />} />
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
