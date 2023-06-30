import { forwardRef, ReactNode } from 'react';

import { Link, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';

interface RouteLinkProps extends LinkProps {
  href: string;
  children: ReactNode;
}

const RouteLink = forwardRef<HTMLAnchorElement, RouteLinkProps>(
  (props, ref) => <Link as={NextLink} ref={ref} {...props} />,
);

export default RouteLink;
