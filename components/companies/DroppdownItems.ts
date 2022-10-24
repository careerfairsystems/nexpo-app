import { Industry, Position } from "../../api/companies";
import { Guild } from "../../api/students";

export const POSITIONS = [
  { label: "Thesis", value: Position.Thesis },
  { label: "Trainee Employment", value: Position.TraineeEmployment },
  { label: "Internship", value: Position.Internship },
  { label: "Summer job", value: Position.SummerJob },
  { label: "Foreign opportunity", value: Position.ForeignOppurtunity },
  { label: "Part time", value: Position.PartTime },
]

export const INDUSTRIES = [
  { label: "Electricity/energy/power"   , value: Industry.ElectricityEnergyPower },
  { label: "Environment"              , value: Industry.Environment },
  { label: "Banking/finance"           , value: Industry.BankingFinance },
  { label: "Union"                    , value: Industry.Union },
  { label: "Investment"               , value: Industry.Investment},
  { label: "Insurance"                , value: Industry.Insurance },
  { label: "Recruitment"              , value: Industry.Recruitment },
  { label: "Construction"             , value: Industry.Construction },
  { label: "Architecture"             , value: Industry.Architecture },
  { label: "Graphic design"            , value: Industry.GraphicDesign },
  { label: "Data/IT"                   , value: Industry.DataIT },
  { label: "Finance consultancy"       , value: Industry.FinanceConsultancy },
  { label: "Telecommunication"        , value: Industry.Telecommunication },
  { label: "Consulting"               , value: Industry.Consulting },
  { label: "Management"               , value: Industry.Management },
  { label: "Media"                    , value: Industry.Media },
  { label: "Industry"                 , value: Industry.Industry },
  { label: "Nuclear power"             , value: Industry.NuclearPower },
  { label: "Life science"              , value: Industry.LifeScience },
  { label: "Medical techniques"        , value: Industry.MedicalTechniques },
  { label: "Property infrastructure"   , value: Industry.PropertyInfrastructure },
  { label: "Research"                 , value: Industry.Research },
  { label: "Coaching"                 , value: Industry.Coaching },
]

export const PROGRAMS = [
  { label: "A"   , value: Guild.A }, 
  { label: "D"   , value: Guild.D },
  { label: "E"   , value: Guild.E },
  { label: "F"   , value: Guild.F },
  { label: "I"   , value: Guild.I },
  { label: "ING"   , value: Guild.ING },
  { label: "K"   , value: Guild.K },
  { label: "M"   , value: Guild.M },
  { label: "V"   , value: Guild.V },
  { label: "W"   , value: Guild.W },
]