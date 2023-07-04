import {Drawer, useDrawer} from '~/components/Drawer';
import {useFetchers, useMatches} from '@remix-run/react';
import {CartHeader} from '~/components/cart/CartHeader';
import {CartDrawer} from '~/components/cart/CartDrawer';
import {useEffect} from 'react';

export function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const {isOpen, openDrawer, closeDrawer} = useDrawer();
  const fetchers = useFetchers();
  const [root] = useMatches();
  const cart = root.data?.cart;

  // Grab all the fetchers that are adding to cart
  const addToCartFetchers = [];
  for (const fetcher of fetchers) {
    if (fetcher?.formData?.get('cartAction') === 'ADD_TO_CART') {
      addToCartFetchers.push(fetcher);
    }
  }
  // When the fetchers array changes, open the drawer if there is an add to cart action
  useEffect(() => {
    if (isOpen || addToCartFetchers.length === 0) return;
    openDrawer();
  }, [addToCartFetchers]);

  return (
    <div className="flex flex-col min-h-screen antialiased bg-neutral-50">
      <header
        role="banner"
        className={`flex items-center h-16 p-6 md:p-8 lg:p-12 sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 antialiased transition shadow-sm`}
      >
        <div className="flex gap-12 w-full items-center">
          <a className="font-bold" href="/">
            {title}
          </a>
          <CartHeader cart={cart} openDrawer={openDrawer} />
        </div>
      </header>

      <main
        role="main"
        id="mainContent"
        className="flex-grow p-6 md:p-8 lg:p-12"
      >
        {children}
        <Drawer open={isOpen} onClose={closeDrawer}>
          <CartDrawer cart={cart} close={closeDrawer} />
        </Drawer>
      </main>
    </div>
  );
}
