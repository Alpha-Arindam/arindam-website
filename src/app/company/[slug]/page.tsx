'use client';

import CompanyDetails from '../../../components/CompanyDetails';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function CompanySlugPage({ params }: PageProps) {
  return <CompanyDetails slug={params.slug} />;
}
