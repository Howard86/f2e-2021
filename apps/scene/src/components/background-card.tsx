import {
  Box,
  Flex,
  Image,
  LinkBox,
  type LinkBoxProps,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';

interface BackgroundCardProps extends LinkBoxProps {
  href?: string;
  image: string;
  imageHeight?: number;
  imageWidth?: number;
  name: string;
}

const BackgroundCard = ({
  name,
  image,
  href = '#',
  ...props
}: BackgroundCardProps) => (
  <LinkBox overflow="hidden" pos="relative" rounded="xl" {...props}>
    <Image alt={name} fit="cover" h="100%" src={image} w="100%" />
    <Flex
      _hover={{
        bgColor: 'blackAlpha.600',
      }}
      bottom="0"
      color="white"
      flexDir="column"
      fontSize="sm"
      fontWeight="bold"
      left="0"
      pos="absolute"
      right="0"
      top="0"
      transition="ease-out"
      transitionDuration="0.2s"
      zIndex="docked"
    >
      <Box flexGrow={1} />
      <Flex
        align="center"
        bgColor="whiteAlpha.400"
        justify="space-between"
        p="2"
      >
        <Text as="h3" color="white" fontSize={['sm', '2xl']} fontWeight="bold">
          <LinkOverlay href={href} rel="noreferrer" target="_blank">
            {name}
          </LinkOverlay>
        </Text>
      </Flex>
    </Flex>
  </LinkBox>
);

export default BackgroundCard;
