import {
  Avatar,
  Box,
  type BoxProps,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  useToken,
} from '@chakra-ui/react';
import { AiOutlineEye } from 'react-icons/ai';
import {
  BsBookmarkPlus,
  BsBookmarkPlusFill,
  BsHeart,
  BsHeartFill,
} from 'react-icons/bs';
import getAvatar from '@/services/avatar';
import RouteLink from './route-link';

interface FanCardProps extends BoxProps {
  city: string;
  description: string;
  href: string;
  id: string;
  image: string;
  liked?: boolean;
  name: string;
  saved?: boolean;
}

// TODO: this design is a bit against the structure, consider refactor all cards
const FanCard = ({
  id,
  name,
  city,
  description,
  image,
  liked,
  saved,
  href,
  ...props
}: FanCardProps) => {
  const size = useToken('w', ['64px', '64px', '128px']);

  return (
    <Box mt={[8, 8, 16]} pos="relative" {...props}>
      <Avatar.Root
        bg="white"
        border="1px"
        borderColor="blackAlpha.600"
        h={size}
        left={['calc(50% - 32px)', 'calc(50% - 32px)', 'calc(50% - 64px)']}
        pos="absolute"
        top={[-8, -8, -16]}
        w={size}
        zIndex="docked"
      >
        <Avatar.Fallback name={name} />
        <Avatar.Image src={getAvatar(name)} />
      </Avatar.Root>
      <IconButton
        aria-label="save-as-bookmark"
        color={saved ? 'red.600' : 'blackAlpha.600'}
        fontSize="2xl"
        m="4"
        pos="absolute"
        right="0"
        rounded="full"
        zIndex="docked"
      >
        {saved ? <BsBookmarkPlusFill /> : <BsBookmarkPlus />}
      </IconButton>
      <Flex
        _hover={{
          boxShadow: '12px 12px 10px',
          color: 'blackAlpha.400',
        }}
        border="1px"
        borderColor="blackAlpha.600"
        flexDir="column"
        overflow="hidden"
        pos="relative"
        rounded="3xl"
        transition="ease-out"
        transitionDuration="0.2s"
      >
        <Image
          alt={name}
          h={[300, 200]}
          objectFit="cover"
          objectPosition="center"
          // biome-ignore lint/performance/noJsxPropsBind: callback needs local render state or the current event target.
          onError={(event) => {
            event.currentTarget.src = '/static/fallback.jpg';
          }}
          src={image}
          w="full"
        />
        <LinkBox
          color="text.body"
          display="flex"
          flexDir="column"
          h={[200, 180]}
          m="4"
        >
          <Text
            as="h3"
            fontSize={['xl', '2xl']}
            fontWeight="bold"
            lineClamp={1}
            mb="4"
          >
            <RouteLink as={LinkOverlay} href={href}>
              {name}
            </RouteLink>
          </Text>
          <Text lineClamp={[4, 3]}>{description}</Text>
          <Box flexGrow={1} />
          <Flex justify="flex-end" mt="8">
            <HStack color="blackAlpha.600">
              <Icon as={AiOutlineEye} boxSize="24px" />
              <Text as="span">{id.at(-1)}萬</Text>
              <Icon
                as={liked ? BsHeartFill : BsHeart}
                boxSize="24px"
                color={liked ? 'red.600' : 'inherit'}
              />
              <Text as="span">{id.at(-2)}千</Text>
            </HStack>
          </Flex>
        </LinkBox>
      </Flex>
    </Box>
  );
};

export default FanCard;
