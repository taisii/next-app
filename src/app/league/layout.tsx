export interface LayoutProps {
  children: React.ReactNode;
}

const LeagueLayout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default LeagueLayout;
