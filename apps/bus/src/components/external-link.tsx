import { Link, type LinkProps } from '@chakra-ui/react';

const ExternalLink = (props: LinkProps) => (
  <Link rel="noopener" target="_blank" {...props} />
);

export default ExternalLink;
