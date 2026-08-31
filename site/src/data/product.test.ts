import { describe, expect, it } from 'vitest';

import { product } from './product';

describe('product landing content', () => {
  it('exposes the TEApoio identity and regional focus', () => {
    expect(product.name).toBe('TEApoio');
    expect(product.region).toBe('Grande João Pessoa, Paraíba');
  });

  it('contains the core experience principles', () => {
    expect(product.features.map(({ id }) => id)).toEqual(
      expect.arrayContaining(['clear-language', 'local-support', 'reliable-sources']),
    );
  });
});
