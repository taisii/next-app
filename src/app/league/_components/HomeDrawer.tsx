import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
  Text,
  Box,
  Icon,
} from '@chakra-ui/react';
import { Team, User } from '@prisma/client';
import Link from 'next/link';
import { GoTrophy } from 'react-icons/go';

type HomeDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  leagueId: number;
  userList: User[];
  teamList: Team[];
};

export const HomeDrawer = ({ isOpen, onClose, leagueId, userList, teamList }: HomeDrawerProps) => {
  const isTeamLeague = teamList.length > 0;
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>

        <DrawerBody>
          {isTeamLeague && (
            <>
              <Text mb="1rem" fontSize="xl">
                Team
              </Text>
              <Button
                width="100%"
                leftIcon={<Icon as={GoTrophy} boxSize="1.5rem" />}
                as={Link}
                href={`${leagueId}/teamRanking`}
                mb="1rem"
              >
                Ranking
              </Button>
              {teamList.map((team) => (
                <Button
                  as={Link}
                  href={`/league/${leagueId}/team/${team.name}`}
                  key={team.iconUriIndex}
                  width="100%"
                  variant="outline"
                  mt="1rem"
                >
                  {team.name}
                </Button>
              ))}
            </>
          )}
          <Text mt="3rem" mb="1rem" fontSize="xl">
            User
          </Text>
          <Button
            width="100%"
            leftIcon={<Icon as={GoTrophy} boxSize="1.5rem" />}
            as={Link}
            href={`${leagueId}/ranking`}
            mb="1rem"
          >
            Ranking
          </Button>
          {userList.map((user, index) => (
            <Button key={index} width="100%" variant="outline" mt="1rem">
              {user.name}
            </Button>
          ))}
          <Box height="3rem" />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
