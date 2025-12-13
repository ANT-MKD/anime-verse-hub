import { motion } from 'framer-motion';
import { Share2, Twitter, Facebook, Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface SocialShareProps {
  title: string;
  description?: string;
  url?: string;
}

const SocialShare = ({ title, description, url }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const shareText = `${title}${description ? ` - ${description}` : ''}`;

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2]'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-[#4267B2]/20 hover:text-[#4267B2]'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Lien copié !');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Impossible de copier le lien');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl
        });
      } catch (err) {
        // User cancelled
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      {navigator.share && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNativeShare}
          className="p-2.5 rounded-full glass border border-border hover:border-primary/50 transition-colors"
          title="Partager"
        >
          <Share2 className="w-4 h-4" />
        </motion.button>
      )}
      
      {shareLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2.5 rounded-full glass border border-border transition-colors ${link.color}`}
          title={`Partager sur ${link.name}`}
        >
          <link.icon className="w-4 h-4" />
        </motion.a>
      ))}
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={copyToClipboard}
        className="p-2.5 rounded-full glass border border-border hover:border-primary/50 transition-colors"
        title="Copier le lien"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
      </motion.button>
    </div>
  );
};

export default SocialShare;
