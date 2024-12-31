import { appointments } from "./appointments";

export const prescriptions = [
  {
    id: "19",
    patient_id: "101",
    doctor_id: "1",
    medications: [
      {
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once a day",
        start_date: "2024-10-20",
        end_date: "2024-11-20",
      },
    ],
    prescription_date: "2024-08-11",
    notes: "Continue medication and follow up in one month.",
  },
  {
    id: "20",
    patient_id: "102",
    doctor_id: "1",
    medications: [
      {
        name: "Clonazepam",
        dosage: "0.5mg",
        frequency: "Twice a day",
        start_date: "2024-08-12",
        end_date: "2024-08-26",
      },
      {
        name: "Hydrocortisone Cream",
        dosage: "Apply twice daily",
        frequency: "As needed",
        start_date: "2024-08-13",
        end_date: "2024-08-20",
      },
    ],
    prescription_date: "2024-08-12",
    notes: "Review symptoms and adjust dosage if necessary.",
  },
  {
    id: "21",
    patient_id: "103",
    doctor_id: "1",
    medications: [
      {
        name: "Hydrocortisone Cream",
        dosage: "Apply twice daily",
        frequency: "As needed",
        start_date: "2024-08-13",
        end_date: "2024-08-20",
      },
    ],
    prescription_date: "2024-08-13",
    notes: "Avoid sun exposure and use moisturizer.",
  },
  {
    id: "22",
    patient_id: "104",
    doctor_id: "1",
    medications: [
      {
        name: "Ibuprofen",
        dosage: "200mg",
        frequency: "Every 6 hours",
        start_date: "2024-08-14",
        end_date: "2024-08-17",
      },
    ],
    prescription_date: "2024-08-14",
    notes: "Administer medication with food.",
  },
  {
    id: "23",
    patient_id: "105",
    doctor_id: "5",
    medications: [
      {
        name: "Naproxen",
        dosage: "250mg",
        frequency: "Twice a day",
        start_date: "2024-08-15",
        end_date: "2024-08-25",
      },
    ],
    prescription_date: "2024-08-15",
    notes: "Apply ice to knee and limit physical activity.",
  },
];
