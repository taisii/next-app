import { LeagueProvider } from '@/league/contexts/leagueContext';

export interface LayoutProps {
  children: React.ReactNode;
}

const KingOFKeioLayout: React.FC<LayoutProps> = ({ children }) => {
  return <LeagueProvider>{children}</LeagueProvider>;
};

export default KingOFKeioLayout;
