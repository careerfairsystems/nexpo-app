import { PublicCompanyDto } from "api/Companies";
import { INDUSTRIES, POSITIONS, COMPETENCES } from "components/companies/DroppdownItems";

export const filterData = (query: string, data: PublicCompanyDto[] | null) => {
  if (!query) return data;

  const querys = (query.split(/\s+/))
    .filter(str => str !== "")
    .map(s => s.toLowerCase());

  const matchSomeQuery = (str: string) => (
    querys.some(query => str.toLocaleLowerCase().includes(query))
  );

  const filterCategories = (category: Array<{ label: string, value: number }>) => (
    category
      .filter(({ label }) => matchSomeQuery(label))
      .map(({ value }) => value)
  );

  const companyHasCategory = (company: Array<number> | null, search: Array<number>) => (
    company ? company.some(n => search.includes(n)) : false
  );

  const industriesSearch = filterCategories(INDUSTRIES);
  const positionsSearch = filterCategories(POSITIONS);
  const competencesSearch = filterCategories(COMPETENCES);

  return (data ?? []).filter((company) => {
    const companyMatch = matchSomeQuery(company.name);

    const industriesMatch = companyHasCategory(company.industries, industriesSearch);
    const positionsMatch = companyHasCategory(company.positions, positionsSearch);
    const competencesMatch = companyHasCategory(company.desiredCompetences, competencesSearch);

    return companyMatch || industriesMatch || positionsMatch || competencesMatch;
  });
};
