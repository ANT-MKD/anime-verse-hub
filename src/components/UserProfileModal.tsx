import { useState } from 'react';
import { User, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useUserProfile, defaultAvatars } from '@/contexts/UserProfileContext';
import { cn } from '@/lib/utils';

const UserProfileModal = () => {
  const { profile, updateProfile, isProfileSet } = useUserProfile();
  const [open, setOpen] = useState(false);
  const [pseudo, setPseudo] = useState(profile.pseudo);
  const [avatar, setAvatar] = useState(profile.avatar || defaultAvatars[0]);
  const [bio, setBio] = useState(profile.bio);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setPseudo(profile.pseudo);
      setAvatar(profile.avatar || defaultAvatars[0]);
      setBio(profile.bio);
    }
    setOpen(isOpen);
  };

  const handleSave = () => {
    updateProfile({ pseudo, avatar, bio });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {isProfileSet ? (
            <span className="text-xl">{profile.avatar || '👤'}</span>
          ) : (
            <User className="h-5 w-5" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card border-glass-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Edit3 className="h-5 w-5 text-primary" />
            Mon Profil
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Avatar Selection */}
          <div className="space-y-3">
            <Label>Avatar</Label>
            <div className="flex flex-wrap gap-2">
              {defaultAvatars.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setAvatar(emoji)}
                  className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all',
                    'hover:bg-primary/20 border border-transparent',
                    avatar === emoji && 'border-primary bg-primary/20 glow-border'
                  )}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50">
            <span className="text-4xl">{avatar}</span>
            <div>
              <p className="font-display text-lg text-primary">
                {pseudo || 'Ton pseudo'}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {bio || 'Ta bio...'}
              </p>
            </div>
          </div>

          {/* Pseudo */}
          <div className="space-y-2">
            <Label htmlFor="pseudo">Pseudo</Label>
            <Input
              id="pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              placeholder="Entre ton pseudo"
              maxLength={30}
              className="bg-card/50 border-glass-border"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Parle-nous de toi, tes animes préférés..."
              maxLength={200}
              rows={3}
              className="bg-card/50 border-glass-border resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">
              {bio.length}/200
            </p>
          </div>

          <Button onClick={handleSave} className="w-full">
            Sauvegarder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
