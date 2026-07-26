import React from 'react';

import { Flex, FlexProps, Icon, Link, Tag } from '@chakra-ui/react';
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
    <Flex direction={['column', 'row']} gap={2} align="center" {...props}>
      <Tag.Root
        flexShrink={0}
        flexGrow={0}
        colorPalette="blue"
        variant="outline"
        size="lg"
        m="2"
      >
        <Tag.Label>{label}</Tag.Label>
        <Tag.EndElement>
          <Icon as={icon} />
        </Tag.EndElement>
      </Tag.Root>

      {href ? (
        <Link href={href} target="_blank" rel="noreferrer">
          {info}
        </Link>
      ) : (
        info
      )}
    </Flex>
  );
};

export default SceneDetailBox;
