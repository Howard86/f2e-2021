import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { CITY_STORAGE_KEY } from './[citySlug]';

import { getFromLocalStorage } from '@/utils/local-storage';

// TODO: this will hurt SEO, consider put logic in cookies & handle it in _middleware
const EmptyCityPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/city/${getFromLocalStorage(CITY_STORAGE_KEY) || 'taipei'}`);
  }, [router]);

  return null;
};

export default EmptyCityPage;
