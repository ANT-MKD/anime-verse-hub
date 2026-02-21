import { useAdmin } from '@/contexts/AdminContext';
import AIChatbot from './AIChatbot';

const AIChatbotWrapper = () => {
  const { settings } = useAdmin();
  if (!settings.showChatbot) return null;
  return <AIChatbot />;
};

export default AIChatbotWrapper;
