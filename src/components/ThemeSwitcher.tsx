import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme, themeInfo, AnimeTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Palette className="h-5 w-5" />
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background"
            style={{ backgroundColor: themeInfo[theme].color }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 glass-card">
        {(Object.keys(themeInfo) as AnimeTheme[]).map((t) => (
          <DropdownMenuItem
            key={t}
            onClick={() => setTheme(t)}
            className={cn(
              'flex items-center gap-3 cursor-pointer',
              theme === t && 'bg-primary/20'
            )}
          >
            <span
              className="w-4 h-4 rounded-full border border-border"
              style={{ backgroundColor: themeInfo[t].color }}
            />
            <span>{themeInfo[t].name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
