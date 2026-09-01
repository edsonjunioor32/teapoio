import { describe, expect, it } from 'vitest';

import { searchItems } from './search';

describe('site search index', () => {
  it('contains a useful destination for FUNAD', () => {
    expect(searchItems.some((item) => `${item.title} ${item.keywords}`.toLowerCase().includes('funad'))).toBe(true);
  });

  it('makes the FUNAD TEA service discoverable by its practical terms', () => {
    const seriItem = searchItems.find((item) => item.title.includes('SERI'));

    expect(seriItem?.description).toContain('TEA');
    expect(seriItem?.keywords).toContain('estimulação precoce');
    expect(seriItem?.href).toBe('/apoio/#funad-seri-tea');
  });

  it('contains an official-orientation destination for lawyer searches', () => {
    const lawyerItem = searchItems.find((item) => item.keywords.includes('advogados'));
    expect(lawyerItem?.href).toBe('/direitos/#orientacao-juridica');
  });

  it('indexes the user-provided lawyer contacts as rights resources', () => {
    const raphaellaItem = searchItems.find((item) => item.title.includes('Raphaella Martins'));

    expect(raphaellaItem?.topics).toContain('direitos');
    expect(raphaellaItem?.regions).toContain('online');
    expect(raphaellaItem?.href).toBe('/apoio/#raphaella-martins-advogada');
  });

  it('classifies directory entries for topic and location filters', () => {
    const funadItem = searchItems.find((item) => item.title.includes('FUNAD'));
    const cerItem = searchItems.find((item) => item.title.includes('CER IV'));

    expect(funadItem?.topics).toContain('direitos');
    expect(funadItem?.regions).toContain('paraiba');
    expect(cerItem?.topics).toContain('servicos');
    expect(cerItem?.regions).toContain('joao-pessoa');

    const bayeuxItem = searchItems.find((item) => item.title.includes('Afettos'));
    const santaRitaItem = searchItems.find((item) => item.title.includes('Aprimorar'));
    expect(bayeuxItem?.regions).toEqual(expect.arrayContaining(['bayeux', 'grande-joao-pessoa', 'paraiba']));
    expect(santaRitaItem?.regions).toEqual(expect.arrayContaining(['santa-rita', 'grande-joao-pessoa', 'paraiba']));
  });
});
