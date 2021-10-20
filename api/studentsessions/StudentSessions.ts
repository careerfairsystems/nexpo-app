
export interface StudentSessionTimeslot {
  id: number;
  start: Date;
  end: Date;
  location: string;
  studentId: number | null;
  companyId: number;
}
