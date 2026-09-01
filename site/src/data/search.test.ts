import { describe, expect, it } from 'vitest';

import { directoryEntries, getDirectorySegment } from './directory';
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

  it('indexes leisure offers by benefit and destination', () => {
    const cinemaItem = searchItems.find((item) => item.title.includes('Cinépolis — Manaíra'));
    const bicaItem = searchItems.find((item) => item.title.includes('Parque Zoobotânico'));

    expect(cinemaItem?.category).toBe('Lazer e experiências');
    expect(cinemaItem?.keywords).toContain('meia-entrada');
    expect(cinemaItem?.href).toBe('/lazer/#lazer-cinepolis-manaira');
    expect(cinemaItem?.regions).toContain('joao-pessoa');
    expect(bicaItem?.keywords).toContain('gratuita');
  });

  it('keeps the support directory divided into clear segments', () => {
    const funadRights = directoryEntries.find((entry) => entry.id === 'funad-ciptea');
    const funadEducation = directoryEntries.find((entry) => entry.id === 'funad-educacao-inclusiva');
    const clinic = directoryEntries.find((entry) => entry.id === 'viver-kids');
    const publicChannel = directoryEntries.find((entry) => entry.id === 'defensoria-publica-paraiba');

    expect(funadRights && getDirectorySegment(funadRights)).toBe('direitos-beneficios');
    expect(funadEducation && getDirectorySegment(funadEducation)).toBe('educacao-inclusao');
    expect(clinic && getDirectorySegment(clinic)).toBe('clinicas-terapias');
    expect(publicChannel && getDirectorySegment(publicChannel)).toBe('orgaos-servicos-publicos');
  });

  it('indexes cannabidiol suppliers with their dedicated segment and contact links', () => {
    const abraceItem = searchItems.find((item) => item.title === 'Abrace Esperança');
    const acaflorItem = searchItems.find((item) => item.title === 'Acaflor');

    expect(abraceItem?.category).toBe('Fornecedores de canabidiol');
    expect(abraceItem?.keywords).toContain('canabidiol');
    expect(abraceItem?.href).toBe('/apoio/#abrace-esperanca-canabidiol');
    expect(acaflorItem?.keywords).toContain('cbd');
    expect(acaflorItem?.href).toBe('/apoio/#acaflor-canabidiol');
  });

  it('keeps the CER IV map reference available in the support directory', () => {
    const cerItem = directoryEntries.find((entry) => entry.id === 'cer-iv-espaco-acolher');

    expect(cerItem?.mapHref).toContain('google.com/maps/place/CER+IV');
    expect(cerItem?.mapLabel).toBe('Abrir localização no Google Maps');
  });
});
