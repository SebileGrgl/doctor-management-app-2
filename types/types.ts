import Appointment from "@/app/appointment/page";

export type LinkType = {
  url: string;
  title: string;
  iconPath: string;
};

export type SignupFormData = {
  fullName: string;
  phoneNumber: string;
  eMail: string;
  password: string;
  confirmPassword?: string;
};

export type LoginFormData = {
  eMail: string;
  password: string;
};

export type user = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  profilePhoto: string;
  specialty: string;
};

export type HeaderProps = {
  user: user;
};

export type AnalyticItem = {
  title: string;
  total: number;
  icon: string;
  color: string;
};

export type AppointmentStatus = "Completed" | "Cancelled" | "Pending";

export type Appointment = {
  id: string;
  doctor_id: string;
  patient_id: string;
  prescription_id?: string;
  date: string;
  time: string;
  reason: string;
  consultationType: string;
  status: AppointmentStatus;
  duration: number;
  diseaseDiagnosis?: string[];
  note?: string;
};

export type NewAppointment = Omit<Appointment, "id">;

export type TodayAppointmentsProps = {
  appointmentList: Appointment[];
};

export type EmergencyContact = {
  name: string;
  relationship: string;
  phone: string;
};

export type PatientTest = {
  appointment_id: string;
  test_id: string;
  status: string;
  date?: string;
  result?: string;
};

export type Patient = {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  date_of_joining: string;
  contact_info: {
    phone: string;
    email: string;
    address: string;
  };
  medical_history: string[];
  allergies: string;
  current_medication: string;
  emergency_contact: EmergencyContact[];
  blood_type: string;
  weight: number;
  height: number;
  profile_picture: string;
  tests: PatientTest[];
};

export type AppointmentModalProps = {
  appointment: Appointment | null;
  closeModal: () => void;
  patient: Patient | null;
};

export type YearlyPatientPercentage = {
  year: number;
  new_patients_percentage: number;
  existing_patients_percentage: number;
};

export type YearlyGenderRatio = {
  year: number;
  female_percentage: number;
  male_percentage: number;
  children_percentage: number;
};

export type GenderRatio = {
  selectedYearAnalytics: YearlyGenderRatio;
};

export type Serie = {
  name: string;
  data: number;
};

export type LoadingContextType = {
  isLoading: boolean;
  setLoading: (loading: boolean) => boolean;
};

export type AppointmentTableProps = {
  appointments: Appointment[];
  patients: Patient[];
  users: user[];
};

export type EditAppointmentProps = {
  appointment: Appointment | null;
  patient: Patient | null;
};

export type FilterOptionsProps = {
  appointments: Appointment[];
  setAppointmentsToShow: (appointments: Appointment[]) => void;
  patients: Patient[];
};

export type Frames = "Daily" | "Monthly" | "Yearly";
export type AppointmentFilterParameters = {
  status: string[];
  consultationType: string[];
  timeFrame: {
    frame: Frames | "";
    date: string;
  };
};

export type DatesType = Record<Frames, string>;

export type ClickedOptions = Record<string, boolean>;

export type NewAppointmentModalProp = {
  setIsNewAppointmentModalOpen: (params: boolean) => void;
  createSuccess: () => void;
};

export type SearchFilterProps = {
  patients: Patient[];
  appointments: Appointment[];
  setPatientsToShow: (params: Patient[]) => void;
};

export type PatientsTableProps = {
  patientsToShow: Patient[];
};

export type PatientsFilterModal = {
  setPatientsToShow: (params: Patient[]) => void;
};
export type PatientsFilterParameters = {
  gender: string[];
  disease: string[];
  timeFrame: {
    frame: Frames | "";
    date: string;
  };
};

export type selectedPatientProp = {
  selectedPatient: Patient;
};

export type Medication = {
  name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date: string;
  note?: string;
};

export type FilterModalProps = {
  isToggled: boolean;
  toggleFilterModal: () => void;
  filterParameters: AppointmentFilterParameters;
  setFilterParameters: (params: AppointmentFilterParameters) => void;
  searchTerm?: string;
};

export type ContactFormData = {
  name: string;
  relationship: string;
  phone: string;
};

export type CompletedAppointmentModalsProps = {
  appointment: Appointment | null;
  toggleModal: () => void;
  selectedPatient: Patient | null;
};

export type Test = {
  id: string;
  name: string;
  category: string;
  price: number;
};

export type MultiSelectProps = {
  options: Test[];
  selectedOptions: Test[];
  setSelectedOptions: (params: Test[]) => void;
};

export type AddPrescriptionsModalProps = {
  prescription: Prescription;
  setPrescription: (params: Prescription) => void;
};

export type Prescription = {
  id: string;
  patient_id: string;
  doctor_id: string;
  medications: Medication[];
  prescription_date: string;
  notes?: string;
};

export type MedicationsTableProp = {
  prescription: Prescription;
  handleDeleteMedication: (params: Medication) => void;
};
