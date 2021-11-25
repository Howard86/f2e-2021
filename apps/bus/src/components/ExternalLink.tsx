import React from 'react';

import { Link, LinkProps } from '@chakra-ui/react';

const ExternalLink = (props: LinkProps) => (
  <Link target="_blank" rel="noopener" {...props} />
);

export default ExternalLink;
