import ProductCard from './ProductCard';
import {Product} from '@shopify/hydrogen-react/storefront-api-types';
import {useEffect, useState} from 'react';
import {useFetcher} from '@remix-run/react';

export type ProductGridProps = {
  url: string;
  products: Product[];
  hasNextPage: boolean;
  endCursor: string;
};

export default function ProductGrid({
  products: initProducts,
  url,
  hasNextPage,
  endCursor: initEndCursor,
}: ProductGridProps) {
  const [nextPage, setNextPage] = useState(hasNextPage);

  const [endCursor, setEndCursor] = useState(initEndCursor);

  const [products, setProducts] = useState(initProducts || []);

  // For making client-side requests
  // https://remix.run/docs/en/v1/hooks/use-fetcher
  const fetcher = useFetcher();

  function fetchMoreProducts() {
    // ?index differentiates index routes from their parent layout routes
    // https://remix.run/docs/en/v1/guides/routing#what-is-the-index-query-param
    fetcher.load(`${url}?index&cursor=${endCursor}`);
  }

  useEffect(() => {
    if (!fetcher.data) return;
    const {collection} = fetcher.data;

    setProducts((prev) => [...prev, ...collection.products.nodes]);
    setNextPage(collection.products.pageInfo.hasNextPage);
    setEndCursor(collection.products.pageInfo.endCursor);
  }, [fetcher.data]);

  return (
    <section className="w-full gap-4 md:gap-8 grid">
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasNextPage && (
        <div className="flex items-center justify-center mt-6">
          <button
            className="inline-block rounded font-medium text-center py-3 px-6 border w-full cursor-pointer"
            disabled={fetcher.state !== 'idle'}
            onClick={fetchMoreProducts}
          >
            {fetcher.state !== 'idle' ? 'Loading...' : 'Load more products'}
          </button>
        </div>
      )}
    </section>
  );
}
