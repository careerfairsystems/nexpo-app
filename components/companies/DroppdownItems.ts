import { Industry, Position } from "../../api/companies";
import { SwedishProgramme, Programme } from "../../api/students";

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
  { label: "A"   , value: 100}, 
  { label: "D"   , value: 101 },
  { label: "E"   , value: 102 },
  { label: "F"   , value: 103 },
  { label: "I"   , value: 104 },
  { label: "ING"   , value: 105 },
  { label: "K"   , value: 106 },
  { label: "M"   , value: 107 },
  { label: "V"   , value: 108 },
  { label: "W"   , value: 109 },
  { label: "Architecture"   , value: Programme.Architecture, parent: 100 },
  { label: "Industrial design"   , value: SwedishProgramme.Industridesign, parent: 100 },
  { label: "Construction and Railway construction"   , value: SwedishProgramme.Byggteknik_med_Järnvägsteknik, parent: 105 },
  { label: "Construction and architecture"   , value: SwedishProgramme.Byggteknik_med_arkitektur, parent: 105 },
  { label: "Construction and road"   , value: SwedishProgramme.Byggteknik_med_väg_och_trafikteknik, parent: 105 },
  { label: "Computer/Software engineering"   , value: SwedishProgramme.Datateknik, parent: 101 },
  { label: "Engineering Information and comunication"   , value: SwedishProgramme.Informations_och_Kommunikationsteknik, parent: 101 },
  { label: "Electrical engineering"   , value: SwedishProgramme.Elektroteknik, parent: 102 },
  { label: "Medical engineering"   , value: SwedishProgramme.Medicinteknik, parent: 102 },
  { label: "Industrial economics"   , value: SwedishProgramme.Industriell_ekonomi, parent: 104 },
  { label: "Ecological engineering"   , value: SwedishProgramme.Ekosystemteknik, parent: 109 },
  { label: "Chemical engineering"   , value: SwedishProgramme.Kemiteknik, parent: 106 },
  { label: "Engineering Biotechnology"   , value: SwedishProgramme.Bioteknik, parent: 106 },
  { label: "Land surveying"   , value: SwedishProgramme.Lantmäteri, parent: 108 },
  { label: "Fire engineer"   , value: SwedishProgramme.Brandingenjör, parent: 108 }, 
  { label: "Civil engineering"   , value: SwedishProgramme.Väg_och_vatttenbyggnad, parent: 108 },
  { label: "Mechanical engineering"   , value: SwedishProgramme.Maskinteknik, parent: 107 },
  { label: "Mechanical engineering with technical design"   , value: SwedishProgramme.Maskinteknik_Teknisk_Design, parent: 107 },
  { label: "Engineering Nanoscience"   , value: SwedishProgramme.Nanoveteknik, parent: 103 },
  { label: "Engineering Physcics"   , value: SwedishProgramme.Teknisk_Fysik, parent: 103 },
  { label: "Engineering Mathematics"   , value: SwedishProgramme.Teknisk_Matematik, parent: 103 },
]