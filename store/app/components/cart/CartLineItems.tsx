import {flattenConnection} from '@shopify/hydrogen-react';
import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {
  BaseCartLineConnection,
  CartLine,
} from '@shopify/hydrogen/dist/storefront-api-types';
import {ItemRemoveButton} from '~/components/cart/ItemRemove';

export function CartLineItems({linesObj}: {linesObj: BaseCartLineConnection}) {
  const lines = flattenConnection(linesObj);
  return (
    <div className="space-y-8">
      {lines.map((line) => {
        return <LineItem key={line.id} lineItem={line} />;
      })}
    </div>
  );
}

function LineItem({lineItem}: {lineItem: CartLine}) {
  const {merchandise, quantity} = lineItem;

  return (
    <div className="flex gap-4">
      <Link
        to={`/products/${merchandise.product.handle}`}
        className="flex-shrink-0"
      >
        {merchandise.image && (
          <Image data={merchandise.image} width={110} height={110} />
        )}
      </Link>
      <div className="flex-1">
        <Link
          to={`/products/${merchandise.product.handle}`}
          className="no-underline hover:underline"
        >
          {merchandise.product.title}
        </Link>
        <div className="text-gray-800 text-sm">{merchandise.title}</div>
        <div className="text-gray-800 text-sm">Qty: {quantity}</div>
        <ItemRemoveButton lineIds={[lineItem.id]} />
      </div>
      <Money data={lineItem.cost.totalAmount} />
    </div>
  );
}
