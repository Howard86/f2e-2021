import { forwardRef, ReactNode } from 'react';

import { Link, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';

interface RouteLinkProps extends LinkProps {
  href: string;
  children: ReactNode;
}

const RouteLink = forwardRef<HTMLAnchorElement, RouteLinkProps>(
  ({ children, href, ...props }, ref) => (
    <Link asChild {...props}>
      <NextLink href={href} ref={ref}>
        {children}
      </NextLink>
    </Link>
  ),
);

export default RouteLink;
