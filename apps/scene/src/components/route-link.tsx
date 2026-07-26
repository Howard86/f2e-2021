import { Link, type LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { ReactNode, RefObject } from 'react';

interface RouteLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
}

const RouteLink = ({
  as: Component = Link,
  children,
  href,
  ref,
  ...props
}: RouteLinkProps & { ref?: RefObject<HTMLAnchorElement | null> }) => (
  <Component asChild {...props}>
    <NextLink href={href} ref={ref}>
      {children}
    </NextLink>
  </Component>
);

export default RouteLink;
