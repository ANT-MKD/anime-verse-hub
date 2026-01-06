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
import AuthPage from "./pages/AuthPage";
import AIChatbot from "./components/AIChatbot";
import RandomCharacterButton from "./components/RandomCharacterButton";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminUserEditPage from "./pages/admin/AdminUserEditPage";
import AdminUserViewPage from "./pages/admin/AdminUserViewPage";
import AdminAnimesPage from "./pages/admin/AdminAnimesPage";
import AdminAnimeEditPage from "./pages/admin/AdminAnimeEditPage";
import AdminAnimeViewPage from "./pages/admin/AdminAnimeViewPage";
import AdminCharactersPage from "./pages/admin/AdminCharactersPage";
import AdminCharacterEditPage from "./pages/admin/AdminCharacterEditPage";
import AdminCharacterViewPage from "./pages/admin/AdminCharacterViewPage";
import AdminTierListPage from "./pages/admin/AdminTierListPage";
import AdminQuizPage from "./pages/admin/AdminQuizPage";
import AdminBattlesPage from "./pages/admin/AdminBattlesPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

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
                <Route path="/auth" element={<AuthPage />} />
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
                
                {/* Admin Routes - Protected */}
                <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
                <Route path="/admin/users" element={<AdminProtectedRoute><AdminUsersPage /></AdminProtectedRoute>} />
                <Route path="/admin/users/new" element={<AdminProtectedRoute><AdminUserEditPage /></AdminProtectedRoute>} />
                <Route path="/admin/users/:userId/edit" element={<AdminProtectedRoute><AdminUserEditPage /></AdminProtectedRoute>} />
                <Route path="/admin/users/:userId/view" element={<AdminProtectedRoute><AdminUserViewPage /></AdminProtectedRoute>} />
                <Route path="/admin/animes" element={<AdminProtectedRoute><AdminAnimesPage /></AdminProtectedRoute>} />
                <Route path="/admin/animes/new" element={<AdminProtectedRoute><AdminAnimeEditPage /></AdminProtectedRoute>} />
                <Route path="/admin/animes/:animeId/edit" element={<AdminProtectedRoute><AdminAnimeEditPage /></AdminProtectedRoute>} />
                <Route path="/admin/animes/:animeId/view" element={<AdminProtectedRoute><AdminAnimeViewPage /></AdminProtectedRoute>} />
                <Route path="/admin/characters" element={<AdminProtectedRoute><AdminCharactersPage /></AdminProtectedRoute>} />
                <Route path="/admin/characters/new" element={<AdminProtectedRoute><AdminCharacterEditPage /></AdminProtectedRoute>} />
                <Route path="/admin/characters/:characterId/edit" element={<AdminProtectedRoute><AdminCharacterEditPage /></AdminProtectedRoute>} />
                <Route path="/admin/characters/:characterId/view" element={<AdminProtectedRoute><AdminCharacterViewPage /></AdminProtectedRoute>} />
                <Route path="/admin/tierlist" element={<AdminProtectedRoute><AdminTierListPage /></AdminProtectedRoute>} />
                <Route path="/admin/quiz" element={<AdminProtectedRoute><AdminQuizPage /></AdminProtectedRoute>} />
                <Route path="/admin/battles" element={<AdminProtectedRoute><AdminBattlesPage /></AdminProtectedRoute>} />
                <Route path="/admin/settings" element={<AdminProtectedRoute><AdminSettingsPage /></AdminProtectedRoute>} />
                
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
