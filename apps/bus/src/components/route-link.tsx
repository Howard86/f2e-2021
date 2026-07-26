import { Link, type LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { ReactNode, RefObject } from 'react';

interface RouteLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
}

const RouteLink = ({
  children,
  href,
  ref,
  ...props
}: RouteLinkProps & { ref?: RefObject<HTMLAnchorElement | null> }) => (
  <Link asChild {...props}>
    <NextLink href={href} ref={ref}>
      {children}
    </NextLink>
  </Link>
);

export default RouteLink;
