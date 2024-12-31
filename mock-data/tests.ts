import { Test } from "@/types/types";

const tests: Test[] = [
  {
    id: "cbc",
    name: "Complete Blood Count (CBC)",
    category: "Laboratory Test",
    price: 50,
  },
  {
    id: "cmp",
    name: "Comprehensive Metabolic Panel (CMP)",
    category: "Laboratory Test",
    price: 80,
  },
  {
    id: "lipid_panel",
    name: "Lipid Panel",
    category: "Laboratory Test",
    price: 70,
  },
  {
    id: "thyroid_panel",
    name: "Thyroid Panel",
    category: "Endocrinology",
    price: 90,
  },
  {
    id: "a1c",
    name: "Hemoglobin A1C",
    category: "Diabetes Test",
    price: 40,
  },
  {
    id: "glucose",
    name: "Blood Glucose Test",
    category: "Diabetes Test",
    price: 35,
  },
  {
    id: "vitamin_d",
    name: "Vitamin D Test",
    category: "Laboratory Test",
    price: 55,
  },
  {
    id: "vitamin_b12",
    name: "Vitamin B12 Test",
    category: "Laboratory Test",
    price: 45,
  },
  {
    id: "iron_panel",
    name: "Iron Panel",
    category: "Laboratory Test",
    price: 60,
  },
  {
    id: "urine_analysis",
    name: "Urine Analysis",
    category: "Laboratory Test",
    price: 30,
  },
  {
    id: "x_ray",
    name: "X-Ray",
    category: "Imaging",
    price: 100,
  },
  {
    id: "mri",
    name: "MRI (Magnetic Resonance Imaging)",
    category: "Imaging",
    price: 250,
  },
  {
    id: "ct_scan",
    name: "CT Scan (Computed Tomography)",
    category: "Imaging",
    price: 300,
  },
  {
    id: "ultrasound",
    name: "Ultrasound",
    category: "Imaging",
    price: 150,
  },
  {
    id: "ekg",
    name: "EKG (Electrocardiogram)",
    category: "Cardiology",
    price: 80,
  },
  {
    id: "echocardiogram",
    name: "Echocardiogram",
    category: "Cardiology",
    price: 200,
  },
  {
    id: "allergy_panel",
    name: "Allergy Panel",
    category: "Allergy Test",
    price: 120,
  },
  {
    id: "stool_test",
    name: "Stool Test",
    category: "Laboratory Test",
    price: 50,
  },
  {
    id: "h_pylori",
    name: "H. Pylori Test",
    category: "Gastroenterology",
    price: 65,
  },
  {
    id: "pft",
    name: "Pulmonary Function Test (PFT)",
    category: "Pulmonology",
    price: 90,
  },
  {
    id: "covid_pcr",
    name: "COVID-19 PCR Test",
    category: "Laboratory Test",
    price: 100,
  },
  {
    id: "hep_b_panel",
    name: "Hepatitis B Panel",
    category: "Infectious Diseases",
    price: 110,
  },
  {
    id: "std_panel",
    name: "Sexually Transmitted Disease (STD) Panel",
    category: "Laboratory Test",
    price: 150,
  },
];

export default tests;
