import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, RotateCcw, ImagePlus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface MessageContent {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: { url: string };
}

interface Message {
  role: 'user' | 'assistant';
  content: string | MessageContent[];
}

const SUGGESTIONS = [
  "🏐 Compare Hinata et Kageyama",
  "⚔️ Qui est le plus fort entre Gojo et Sukuna ?",
  "🎌 Recommande-moi un anime",
  "🧠 Fais-moi un quiz anime !",
  "🔥 Top 5 des combats les plus épiques",
  "💀 Explique le Death Note",
];

const getTextContent = (content: string | MessageContent[]): string => {
  if (typeof content === 'string') return content;
  const textPart = content.find(c => c.type === 'text');
  return textPart?.text || '';
};

const getImageUrl = (content: string | MessageContent[]): string | null => {
  if (typeof content === 'string') return null;
  const imagePart = content.find(c => c.type === 'image_url');
  return imagePart?.image_url?.url || null;
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '### Salut ! 👋\nJe suis **AnimeBot**, ton expert anime alimenté par l\'IA !\n\nJe peux :\n- 📊 **Comparer** des personnages avec leurs stats\n- 🎯 **Recommander** des animes selon tes goûts\n- 🧠 Te faire passer un **quiz**\n- ⚔️ Analyser qui gagnerait un **combat**\n- 📸 **Identifier** un personnage à partir d\'une image\n\nPose-moi une question ou envoie-moi une image ! 🎌' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) return; // 5MB max

    const reader = new FileReader();
    reader.onload = () => {
      setPendingImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const buildApiMessages = (msgs: Message[]): any[] => {
    return msgs.map(m => {
      if (typeof m.content === 'string') {
        return { role: m.role, content: m.content };
      }
      // Multimodal message
      return { role: m.role, content: m.content };
    });
  };

  const sendMessage = async (overrideInput?: string) => {
    const text = overrideInput || input;
    if ((!text.trim() && !pendingImage) || isLoading) return;

    let userMessage: Message;

    if (pendingImage) {
      const parts: MessageContent[] = [];
      parts.push({ type: 'text', text: text.trim() || 'Identifie ce personnage anime !' });
      parts.push({ type: 'image_url', image_url: { url: pendingImage } });
      userMessage = { role: 'user', content: parts };
      setPendingImage(null);
    } else {
      userMessage = { role: 'user', content: text };
    }

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let assistantContent = '';

    try {
      const apiMessages = buildApiMessages([...messages, userMessage]);

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/anime-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Erreur de connexion');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No reader');

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      let textBuffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                const lastMsg = newMessages[newMessages.length - 1];
                if (lastMsg.role === 'assistant') {
                  lastMsg.content = assistantContent;
                }
                return [...newMessages];
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ Désolé, une erreur s\'est produite. Réessaie plus tard !' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      { role: 'assistant', content: '### Salut ! 👋\nJe suis **AnimeBot**, ton expert anime !\n\nPose-moi une question ou envoie-moi une image ! 🎌' }
    ]);
    setPendingImage(null);
  };

  const showSuggestions = messages.length <= 2 && !isLoading;

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] glass-card rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/20 to-transparent">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground flex items-center gap-2">
                    AnimeBot
                    <Sparkles className="w-4 h-4 text-primary" />
                  </h3>
                  <p className="text-xs text-muted-foreground">Expert Anime • Vision IA</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                  title="Nouvelle conversation"
                >
                  <RotateCcw className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => {
                const textContent = getTextContent(message.content);
                const imageUrl = getImageUrl(message.content);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.05, 0.3) }}
                    className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === 'user' ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-primary" />
                      ) : (
                        <Bot className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className={`max-w-[80%] rounded-2xl overflow-hidden ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                        : 'bg-muted text-foreground rounded-tl-sm'
                    }`}>
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt="Image envoyée"
                          className="w-full max-h-48 object-cover"
                        />
                      )}
                      <div className="px-4 py-2.5">
                        {message.role === 'assistant' ? (
                          <div className="text-sm prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-h3:text-sm prose-h3:font-bold prose-h3:my-1 prose-h2:text-base prose-h2:font-bold prose-h2:my-1.5 prose-strong:text-foreground prose-table:text-xs">
                            <ReactMarkdown>{textContent}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap">{textContent}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">AnimeBot analyse...</span>
                  </div>
                </motion.div>
              )}

              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {SUGGESTIONS.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(suggestion)}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Pending image preview */}
            {pendingImage && (
              <div className="px-4 pb-2">
                <div className="relative inline-block">
                  <img
                    src={pendingImage}
                    alt="À envoyer"
                    className="h-20 rounded-lg border border-border object-cover"
                  />
                  <button
                    onClick={() => setPendingImage(null)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <motion.button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center hover:bg-accent transition-colors shrink-0"
                  title="Envoyer une image"
                  disabled={isLoading}
                >
                  <ImagePlus className="w-4 h-4 text-muted-foreground" />
                </motion.button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={pendingImage ? "Ajoute un message (optionnel)..." : "Pose ta question sur les animes..."}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || (!input.trim() && !pendingImage)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
