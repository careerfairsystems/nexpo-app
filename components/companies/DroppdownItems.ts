import { Industry, Locations, Position } from "api/Companies";
import { Programme } from "api/Students";

export const POSITIONS = [
  { label: "Thesis", value: Position.Thesis },
  { label: "Trainee Employment", value: Position.TraineeEmployment },
  { label: "Internship", value: Position.Internship },
  { label: "Summer job", value: Position.SummerJob },
  { label: "Foreign opportunity", value: Position.ForeignOppurtunity },
  { label: "Part time", value: Position.PartTime },
];

// This is the original enum of industries, but it is not used in the frontend as IT 22 made a big error in it
// Frontend Manager: See testament for more info
// export const INDUSTRIES = [
//   { label: "Architecture", value: Industry.Architecture },
//   { label: "Banking/finance", value: Industry.BankingFinance },
//   { label: "Coaching", value: Industry.Coaching },
//   { label: "Construction", value: Industry.Construction },
//   { label: "Consulting", value: Industry.Consulting },
//   { label: "Data/IT", value: Industry.DataIT },
//   { label: "Electricity/Energy/Power", value: Industry.ElectricityEnergyPower },
//   { label: "Environment", value: Industry.Environment },
//   { label: "Finance Consultancy", value: Industry.FinanceConsultancy },
//   { label: "Graphic Design", value: Industry.GraphicDesign },
//   { label: "Industry", value: Industry.Industry },
//   { label: "Insurance", value: Industry.Insurance },
//   { label: "Investment", value: Industry.Investment },
//   { label: "Life Science", value: Industry.Life_Science },
//   { label: "Management", value: Industry.Management },
//   { label: "Media", value: Industry.Media },
//   { label: "Medical Techniques", value: Industry.MedicalTechniques },
//   { label: "Nuclear Power", value: Industry.NuclearPower },
//   { label: "Property Infrastructure", value: Industry.PropertyInfrastructure },
//   { label: "Recruitment", value: Industry.Recruitment },
//   { label: "Research", value: Industry.Research },
//   { label: "Telecommunication", value: Industry.Telecommunication },
//   { label: "Union", value: Industry.Union },
// ];

export const INDUSTRIES = [
  { label: "Architecture", value: Industry.Architecture },
  { label: "Banking/finance", value: Industry.BankingFinance },
  { label: "Construction", value: Industry.Construction },
  { label: "Consulting", value: Industry.Consulting },
  { label: "Data/IT", value: Industry.DataIT },
  { label: "Environment", value: Industry.Environment },
  { label: "Graphic Design", value: Industry.GraphicDesign },
  { label: "Industry", value: Industry.Industry },
  { label: "Insurance", value: Industry.Insurance },
  { label: "Investment", value: Industry.Investment },
  { label: "Management", value: Industry.Management },
  { label: "Media", value: Industry.Media },
  { label: "Medical Techniques", value: Industry.MedicalTechniques },
  { label: "Nuclear Power", value: Industry.NuclearPower },
  { label: "Research", value: Industry.Research },
  { label: "Telecommunication", value: Industry.Telecommunication },
  { label: "Union", value: Industry.Union },
];

export const PROGRAMS = [
  { label: "Architecture", value: Programme.Architecture },
  { label: "Automotive", value: Programme.Automotive},
  { label: "Automation", value: Programme.Automation},
  { label: "Biomedical Engineering", value: Programme.Biomedical_Engineering },
  { label: "Chemical Engineering", value: Programme.Chemical_Engineering },
  { label: "Civil Engineering", value: Programme.Civil_Engineering },
  { label: "Computer Science and Engineering", value: Programme.Computer_Science_Engineering },
  { label: "Construction and Architecture", value: Programme.Construction_and_Architecture },
  { label: "Construction and Railway Construction", value: Programme.Construction_and_Railway_Construction },
  { label: "Traffic and Road", value: Programme.Road_and_Traffic_Technology },
  { label: "Electrical Engineering", value: Programme.Electrical_Engineering },
  { label: "Engineering Biotechnology", value: Programme.Engineering_Biotechnology },
  { label: "Information and Communication Engineering", value: Programme.Information_and_Communication_Engineering },
  { label: "Engineering Mathematics", value: Programme.Engineering_Mathematics },
  { label: "Engineering Nanoscience", value: Programme.Engineering_Nanoscience },
  { label: "Engineering Physics", value: Programme.Engineering_Physics },
  { label: "Environmental Engineering", value: Programme.Environmental_Engineering },
  { label: "Fire Protection Engineering", value: Programme.Fire_Protection_Engineering },
  { label: "Industrial Design", value: Programme.Industrial_Design },
  { label: "Industrial Engineering and Management", value: Programme.Industrial_Engineering_and_Management },
  { label: "Surveying", value: Programme.Surveying },
  { label: "Mechanical Engineering", value: Programme.Mechanical_engineering },
  { label: "Mechanical Engineering with Technical Design", value: Programme.Mechanical_Engineering_with_Industrial_Design },
  { label: "Risk, Safety and Crisis Management", value: Programme.Risk_Safety_and_Crisis_Management},
];


export const LOCATIONS = [
  { label: "Studiecentrum", value: Locations.Studiecentrum },
  { label: "Kårhuset", value: Locations.Kårhuset },
  { label: "E-Huset", value: Locations.E_huset },
  { label: "Tent", value: Locations.Tent },
];

export const YEARS = [
  { label: "1st year", value: 1 },
  { label: "2nd year", value: 2 },
  { label: "3rd year", value: 3 },
  { label: "4th year", value: 4 },
  { label: "5th year", value: 5 },
];

export const LUNCHTIMES = [
  { label: "11:00", value: "11:00:00" },
  { label: "11:15", value: "11:15:00" },
  { label: "11:30", value: "11:30:00" },
  { label: "11:45", value: "11:45:00" },
  { label: "12:00", value: "12:00:00" },
  { label: "12:15", value: "12:15:00" },
  { label: "12:30", value: "12:30:00" },
  { label: "12:45", value: "12:45:00" },
  { label: "13:00", value: "13:00:00" },
  { label: "13:15", value: "13:15:00" },
  { label: "13:30", value: "13:30:00" },
  { label: "13:45", value: "13:45:00" },
];
