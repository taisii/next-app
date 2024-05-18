import { Text } from '@chakra-ui/react';

const TeamPage = ({ params }: { params: { leagueId: string; teamName: string } }) => {
  const leagueId = Number(params.leagueId);
  const teamName = params.teamName;
  return (
    <>
      <Text>league ページです</Text>
      <Text>{teamName}</Text>
    </>
  );
};

export default TeamPage;
