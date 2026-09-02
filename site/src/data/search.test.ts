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

  it('makes the expanded rights guidance discoverable from the home search', () => {
    const rightsItem = searchItems.find((item) => item.id === 'direitos-documentos');

    expect(rightsItem?.keywords).toContain('ipva');
    expect(rightsItem?.keywords).toContain('pictograma');
    expect(rightsItem?.keywords).toContain('ipi');
    expect(rightsItem?.keywords).toContain('meia-entrada');
    expect(rightsItem?.keywords).toContain('interestadual');
    expect(rightsItem?.keywords).toContain('cia');
    expect(rightsItem?.keywords).toContain('acompanhante especializado');
    expect(rightsItem?.keywords).toContain('profissional de apoio escolar');
    expect(rightsItem?.keywords).toContain('paee');
    expect(rightsItem?.keywords).toContain('pei');
    expect(rightsItem?.href).toBe('/direitos/#direitos-federais-escola');
  });

  it('makes health plan rights discoverable from the home search', () => {
    const planRightsItem = searchItems.find((item) => item.id === 'direitos-planos-saude');

    expect(planRightsItem?.href).toBe('/direitos/#direitos-plano-saude');
    expect(planRightsItem?.keywords).toContain('reembolso');
    expect(planRightsItem?.keywords).toContain('negativa');
    expect(planRightsItem?.keywords).toContain('rn 539');
  });

  it('makes medication guidance discoverable from the home search', () => {
    const teaItem = searchItems.find((item) => item.id === 'entenda-tea');

    expect(teaItem?.keywords).toContain('risperidona');
    expect(teaItem?.keywords).toContain('melatonina');
    expect(teaItem?.href).toBe('/entenda-o-tea/');
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
    const poligono = directoryEntries.find((entry) => entry.id === 'colegio-poligono');
    const poligonoKids = directoryEntries.find((entry) => entry.id === 'poligono-kids');
    const ie = directoryEntries.find((entry) => entry.id === 'ie-colegio-e-curso');
    const clinic = directoryEntries.find((entry) => entry.id === 'viver-kids');
    const publicChannel = directoryEntries.find((entry) => entry.id === 'defensoria-publica-paraiba');

    expect(funadRights && getDirectorySegment(funadRights)).toBe('direitos-beneficios');
    expect(funadEducation && getDirectorySegment(funadEducation)).toBe('educacao-inclusao');
    expect(poligono && getDirectorySegment(poligono)).toBe('educacao-inclusao');
    expect(poligonoKids?.social).toBe('https://www.instagram.com/colegiopoligono/');
    expect(ie?.contact).toBe('tel:+558332212288');
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

  it('keeps the Fisio&Estímulos contact channels available', () => {
    const fisioItem = directoryEntries.find((entry) => entry.id === 'fisio-estimulos-bayeux-maps');

    expect(fisioItem?.source).toBe('https://www.fisioestimulos.com.br/');
    expect(fisioItem?.contact).toBe('https://wa.me/5583993299823');
    expect(fisioItem?.social).toBe('https://www.instagram.com/fisioeestimulos/');
  });

  it('indexes researched clinics and neuropediatricians with their practical contacts', () => {
    const fonoItem = directoryEntries.find((entry) => entry.id === 'rede-fono-com-amor');
    const proKidsItem = directoryEntries.find((entry) => entry.id === 'pro-kids-clinica-joao-pessoa');
    const alcanceItem = directoryEntries.find((entry) => entry.id === 'alcance-aba-joao-pessoa');
    const sentidosItem = directoryEntries.find((entry) => entry.id === 'sentidos-clinica-joao-pessoa');
    const lailaItem = directoryEntries.find((entry) => entry.id === 'dra-laila-schulz-neuropediatra');
    const pedroItem = directoryEntries.find((entry) => entry.id === 'dr-pedro-lourenzo-neuropediatra');

    expect(fonoItem?.contact).toBe('https://wa.me/5583991502899');
    expect(proKidsItem?.source).toBe('https://www.prokidsclinica.com/');
    expect(alcanceItem?.social).toBe('https://www.instagram.com/alcanceaba/');
    expect(sentidosItem?.contact).toBe('https://wa.me/5583996840409');
    expect(lailaItem && getDirectorySegment(lailaItem)).toBe('clinicas-terapias');
    expect(pedroItem?.tags).toContain('neuropediatra');
  });

  it('does not keep the directory entries requested for removal', () => {
    expect(directoryEntries.some((entry) => entry.name.includes('Instituto Lápis de Cera'))).toBe(false);
    expect(directoryEntries.some((entry) => entry.name.includes('ABC Autismo 123'))).toBe(false);
  });
});
