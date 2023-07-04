import type {
  Product,
  Collection,
} from '@shopify/hydrogen-react/storefront-api-types';

export type MyCollection =
    {myField: string} &
    Partial<Collection>;

