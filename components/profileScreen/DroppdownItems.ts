import { Role } from "api/Role";
import { Committee } from "api/Committee";

export const COMMITTEES = [
    { label: "Economics & Sustainability", value: Committee.ES },
    { label: "Business Relations", value: Committee.BR },
    { label: "Marketing & Public Relations", value: Committee.PR },
    { label: "Event & Recruitment", value: Committee.EV },
    { label: "Fair & Logistics", value: Committee.FoL },
    { label: "Information Technology", value: Committee.IT },
  ];

export const ROLES = [
    { label: "Administrator", value: Role.Administrator },
    { label: "Student", value: Role.Student },
    { label: "Company Representative", value: Role.CompanyRepresentative },
];