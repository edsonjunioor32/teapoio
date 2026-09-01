import { describe, expect, it } from 'vitest';

import { searchItems } from './search';

describe('site search index', () => {
  it('contains a useful destination for FUNAD', () => {
    expect(searchItems.some((item) => `${item.title} ${item.keywords}`.toLowerCase().includes('funad'))).toBe(true);
  });

  it('contains an official-orientation destination for lawyer searches', () => {
    const lawyerItem = searchItems.find((item) => item.keywords.includes('advogados'));
    expect(lawyerItem?.href).toBe('/direitos/#orientacao-juridica');
  });

  it('classifies directory entries for topic and location filters', () => {
    const funadItem = searchItems.find((item) => item.title.includes('FUNAD'));
    const cerItem = searchItems.find((item) => item.title.includes('CER IV'));

    expect(funadItem?.topics).toContain('direitos');
    expect(funadItem?.regions).toContain('paraiba');
    expect(cerItem?.topics).toContain('servicos');
    expect(cerItem?.regions).toContain('joao-pessoa');
  });
});
