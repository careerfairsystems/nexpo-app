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

export const INDUSTRIES = [
  { label: "Architecture", value: Industry.Architecture },
  { label: "Banking/finance", value: Industry.BankingFinance },
  { label: "Coaching", value: Industry.Coaching },
  { label: "Construction", value: Industry.Construction },
  { label: "Consulting", value: Industry.Consulting },
  { label: "Data/IT", value: Industry.DataIT },
  { label: "Electricity/energy/power", value: Industry.ElectricityEnergyPower },
  { label: "Environment", value: Industry.Environment },
  { label: "Finance consultancy", value: Industry.FinanceConsultancy },
  { label: "Graphic design", value: Industry.GraphicDesign },
  { label: "Industry", value: Industry.Industry },
  { label: "Insurance", value: Industry.Insurance },
  { label: "Investment", value: Industry.Investment },
  { label: "Life science", value: Industry.LifeScience },
  { label: "Management", value: Industry.Management },
  { label: "Media", value: Industry.Media },
  { label: "Medical techniques", value: Industry.MedicalTechniques },
  { label: "Nuclear power", value: Industry.NuclearPower },
  { label: "Property infrastructure", value: Industry.PropertyInfrastructure },
  { label: "Recruitment", value: Industry.Recruitment },
  { label: "Research", value: Industry.Research },
  { label: "Telecommunication", value: Industry.Telecommunication },
  { label: "Union", value: Industry.Union },
];

export const PROGRAMS = [
  { label: "Architecture", value: Programme.Architecture },
  { label: "Biomedical Engineering", value: Programme.Medical_engineering },
  { label: "Chemical Engineering", value: Programme.Chemical_engineering },
  { label: "Civil Engineering", value: Programme.Road_and_Water_construction },
  { label: "Computer Science and Engineering", value: Programme.Computer_Software_engineering },
  { label: "Construction and Architecture", value: Programme.Construction_and_architecture },
  { label: "Construction and Railway Construction", value: Programme.Construction_and_Railway_construction },
  { label: "Construction and Road", value: Programme.Construction_and_road },
  { label: "Electrical Engineering", value: Programme.Electrical_engineering },
  { label: "Engineering Biotechnology", value: Programme.Engineering_Biotechnology },
  { label: "Engineering Information and Communication", value: Programme.Engineering_Information_and_comunication },
  { label: "Engineering Mathematics", value: Programme.Engineering_Mathematics },
  { label: "Engineering Nanoscience", value: Programme.Engineering_Nanoscience },
  { label: "Engineering Physics", value: Programme.Engineering_Physics },
  { label: "Environmental Engineering", value: Programme.Ecological_engineering },
  { label: "Fire Protection Engineering", value: Programme.Fire_engineer },
  { label: "Industrial Design", value: Programme.Industrial_design },
  { label: "Industrial Economics", value: Programme.Industrial_economics },
  { label: "Land Surveying", value: Programme.Land_surveying },
  { label: "Mechanical Engineering", value: Programme.Mechanical_engineering },
  { label: "Mechanical Engineering with Technical Design", value: Programme.Mechanical_engineering_with_technical_design },
];


export const LOCATIONS = [
  { label: "Studiecentrum", value: Locations.Studiecentrum },
  { label: "Union Building", value: Locations.Union_Building },
  { label: "E Building", value: Locations.E_Building },
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
