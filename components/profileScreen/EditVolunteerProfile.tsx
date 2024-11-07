import React, { useState } from "react";
import { UpdateStudentDto, Student, Programme } from "api/Students";
import { View, Text } from "../Themed";
import { TextInput } from "../TextInput";
import { EditStatus } from "../../screens/profile/EditProfileScreen";
import { CategoriesDropdown } from "../companies/CategoriesDroppdown";
import { PROGRAMS, YEARS } from "../companies/DroppdownItems";
import { profileInputStyles } from "./ProfileInputStyling";

type EditVolunteerProfileProps = {
  volunteer: Student;
  setUpdateVolunteerDto: (dto: UpdateStudentDto) => void;
  setEditStatus: (status: EditStatus) => void;
};

export default function EditVolunteerProfile({
  volunteer,
  setUpdateVolunteerDto,
  setEditStatus,
}: EditVolunteerProfileProps) {
  const [masterTitle, setMasterTitle] = React.useState<string | null>(
    volunteer.masterTitle
  );
  const [linkedIn, setLinkedIn] = React.useState<string>(
    volunteer.linkedIn === null ? "" : volunteer.linkedIn
  );

  const [programmes, setProgrammes] = useState(PROGRAMS);
  const [programmeOpen, programmeSetOpen] = useState(false);
  const [programme, setProgramme] = useState<Programme | null>(
    volunteer.programme
  );

  const [years, setYears] = useState(YEARS);
  const [yearsOpen, yearsSetOpen] = useState(false);
  const [year, setYear] = React.useState<number | null>(volunteer.year);

  React.useEffect(() => {
    const dto = {
      programme,
      year,
      masterTitle,
      linkedIn,
    };
    setUpdateVolunteerDto(dto);
  }, [programme, linkedIn, masterTitle, year]);

  const _setLinkedIn = (text: string) => {
    setLinkedIn(text);
    if (text.length > 0 && !text.startsWith("https://www.linkedin.com/in/")) {
      setEditStatus({
        ok: false,
        message: "LinkedIn Needs to start with: https://www.linkedin.com/in/",
      });
    } else {
      setEditStatus({ ok: true, message: null });
    }
  };

  return (
    <>
      <Text
        style={profileInputStyles.inputLabel}
      >
        Programme
      </Text>
      <CategoriesDropdown
        title="Desired program"
        items={programmes}
        setOpen={programmeSetOpen}
        setValue={setProgramme}
        open={programmeOpen}
        value={programme}
        setItems={setProgrammes}
        categories={false}
        single={true}
        containerStyle={profileInputStyles.dropdownContainer}
      />


      <Text
        style={profileInputStyles.inputLabel}
      >
        Year
      </Text>
      <CategoriesDropdown
        title="Year of study"
        items={years}
        setOpen={yearsSetOpen}
        setValue={setYear}
        open={yearsOpen}
        value={year}
        setItems={setYears}
        categories={false}
        single={true}
        containerStyle={profileInputStyles.dropdownContainer}
      />

      <Text
        style={profileInputStyles.inputLabel}
      >
        Master Title
      </Text>
      <TextInput
        style={profileInputStyles.textInput}
        value={masterTitle ? masterTitle : ""}
        onChangeText={setMasterTitle}
      />

      <Text
        style={profileInputStyles.inputLabel}
      >
        LinkedIn
      </Text>
      <TextInput
        style={profileInputStyles.textInput}
        value={linkedIn ? linkedIn : ""}
        onChangeText={_setLinkedIn}
        placeholder="https://www.linkedin.com/in/..."
      />
    </>
  );
}