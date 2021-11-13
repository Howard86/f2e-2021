import React from 'react';

import {
  Flex,
  FlexProps,
  Link,
  Tag,
  TagLabel,
  TagRightIcon,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface SceneDetailBoxProps extends FlexProps {
  label: string;
  info?: string;
  href?: string;
  icon: IconType;
}

const SceneDetailBox = ({
  label,
  info,
  href,
  icon,
  ...props
}: SceneDetailBoxProps) => {
  if (!info) {
    return null;
  }

  return (
    <Flex directions={['column', 'row']} space={2} align="center" {...props}>
      <Tag
        flexShrink={0}
        flexGrow={0}
        colorScheme="blue"
        variant="outline"
        size="lg"
        m="2"
      >
        <TagLabel>{label}</TagLabel>
        <TagRightIcon as={icon} />
      </Tag>

      {href ? (
        <Link href={href} isExternal>
          {info}
        </Link>
      ) : (
        info
      )}
    </Flex>
  );
};

export default SceneDetailBox;
