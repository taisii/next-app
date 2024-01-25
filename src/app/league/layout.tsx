import { LeagueProvider } from '@/league/contexts/leagueContext';

export interface LayoutProps {
  children: React.ReactNode;
}

const LeagueLayout: React.FC<LayoutProps> = ({ children }) => {
  return <LeagueProvider>{children}</LeagueProvider>;
};

export default LeagueLayout;
