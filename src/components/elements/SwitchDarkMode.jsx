import { Switch } from '@/components/ui/switch';
import { useTheme } from '../ThemeProvider';

export default function SwitchDarkMode() {
  const { theme, setTheme } = useTheme();
  return (
    <Switch
      checked={theme === 'dark' ? true : false}
      onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    />
  );
}
