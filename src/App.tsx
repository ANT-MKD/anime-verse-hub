import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProfileProvider } from "@/contexts/UserProfileContext";
import { AdminProvider } from "@/contexts/AdminContext";
import MaintenanceGuard from "@/components/admin/MaintenanceGuard";
import FeatureGuard from "@/components/admin/FeatureGuard";
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
import AIChatbotWrapper from "./components/AIChatbotWrapper";
import RandomCharacterButton from "./components/RandomCharacterButton";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnimesPage from "./pages/admin/AdminAnimesPage";
import AdminCharactersPage from "./pages/admin/AdminCharactersPage";
import AdminCharacterForm from "./pages/admin/AdminCharacterForm";
import AdminCharacterView from "./pages/admin/AdminCharacterView";
import AdminQuizPage from "./pages/admin/AdminQuizPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminMessagesPage from "./pages/admin/AdminMessagesPage";
import AdminNotificationsPage from "./pages/admin/AdminNotificationsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserProfileProvider>
        <AdminProvider>
          <TooltipProvider>
            <FavoritesProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <MaintenanceGuard>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/animes" element={<AnimesPage />} />
                    <Route path="/characters" element={<CharactersPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/comparator" element={<FeatureGuard feature="allowComparator"><ComparatorPage /></FeatureGuard>} />
                    <Route path="/quiz" element={<FeatureGuard feature="allowQuiz"><QuizPage /></FeatureGuard>} />
                    <Route path="/battle" element={<FeatureGuard feature="allowBattle"><BattleSimulator /></FeatureGuard>} />
                    <Route path="/timeline" element={<TimelinePage />} />
                    <Route path="/tierlist" element={<FeatureGuard feature="allowTierList"><TierListPage /></FeatureGuard>} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/anime/:animeId" element={<AnimeCharacters />} />
                    <Route path="/anime/:animeId/character/:characterId" element={<CharacterProfile />} />
                    
                    {/* Admin routes */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/animes" element={<AdminAnimesPage />} />
                    <Route path="/admin/characters" element={<AdminCharactersPage />} />
                    <Route path="/admin/characters/new" element={<AdminCharacterForm />} />
                    <Route path="/admin/characters/edit/:id" element={<AdminCharacterForm />} />
                    <Route path="/admin/characters/view/:id" element={<AdminCharacterView />} />
                    <Route path="/admin/quiz" element={<AdminQuizPage />} />
                    <Route path="/admin/users" element={<AdminUsersPage />} />
                    <Route path="/admin/messages" element={<AdminMessagesPage />} />
                    <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
                    <Route path="/admin/settings" element={<AdminSettingsPage />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </MaintenanceGuard>
                <AIChatbotWrapper />
                <RandomCharacterButton />
              </BrowserRouter>
            </FavoritesProvider>
          </TooltipProvider>
        </AdminProvider>
      </UserProfileProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
