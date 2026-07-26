import { forwardRef, ReactNode } from 'react';

import { Link, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';

interface RouteLinkProps extends LinkProps {
  href: string;
  children: ReactNode;
}

const RouteLink = forwardRef<HTMLAnchorElement, RouteLinkProps>(
  ({ as: Component = Link, children, href, ...props }, ref) => (
    <Component asChild {...props}>
      <NextLink ref={ref} href={href}>
        {children}
      </NextLink>
    </Component>
  ),
);

export default RouteLink;
