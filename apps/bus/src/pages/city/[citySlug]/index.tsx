import { CITIES, CitySlug, CitySlugMap } from '@f2e/ptx';
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

const CityPage = () => null;

export const getStaticPaths = (): GetStaticPathsResult => ({
  fallback: true,
  paths: [],
});

export const getStaticProps = (
  context: GetStaticPropsContext,
): GetStaticPropsResult<unknown> => {
  const citySlug = context.params.citySlug as CitySlug;

  if (typeof citySlug !== 'string' || !CITIES.includes(CitySlugMap[citySlug])) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: `/city/${citySlug}/bus`,
      permanent: false,
    },
  };
};

export default CityPage;
