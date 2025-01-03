export const patients = [
  {
    id: "101",
    first_name: "Jane",
    last_name: "Smith",
    date_of_birth: "1990-05-15",
    gender: "Female",
    date_of_joining: "2021-05-15",
    contact_info: {
      phone: "+1-202-555-0198",
      email: "janesmith@example.com",
      address: "123 Main St, Springfield, IL",
    },
    medical_history: ["Asthma", "Type 2 Diabetes"],
    allergies: "Peanuts",
    current_medication: "Metformin 500mg",
    emergency_contact: [
      {
        name: "Michael Smith",
        relationship: "Husband",
        phone: "+1-202-555-0111",
      },
    ],
    blood_type: "O+",
    weight: 68,
    height: 165,
    profile_picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzE0vPkVph68ihTur8fttQLnUxAPOoMdvoR_GsMCr1YxIBBg-EojgADAY&s=10",
    tests: [],
  },
  {
    id: "102",
    first_name: "John",
    last_name: "Doe",
    date_of_birth: "1985-11-20",
    gender: "Male",
    date_of_joining: "2023-07-15",

    contact_info: {
      phone: "+1-202-555-0187",
      email: "johndoe@example.com",
      address: "456 Elm St, Springfield, IL",
    },
    medical_history: ["Hypertension"],
    allergies: "None",
    current_medication: "Lisinopril 10mg",
    emergency_contact: [
      {
        name: "Emily Doe",
        relationship: "Wife",
        phone: "+1-202-555-0179",
      },
      {
        name: "Kyle Connor",
        relationship: "Son",
        phone: "+1-202-555-0133",
      },
    ],
    blood_type: "A+",
    weight: 85,
    height: 180,
    profile_picture: "https://picsum.photos/id/2/200/200",
    tests: [
      {
        appointment_id: "92",
        test_id: "cmp",
        status: "Completed",
        date: "2024-09-19",
        result: "file_url",
      },
    ],
  },
  {
    id: "103",
    first_name: "Sarah",
    last_name: "Connor",
    date_of_birth: "1978-02-27",
    gender: "Female",
    date_of_joining: "2022-09-19",

    contact_info: {
      phone: "+1-202-555-0152",
      email: "sarahconnor@example.com",
      address: "789 Oak St, Springfield, IL",
    },
    medical_history: ["Thyroid Disorder"],
    allergies: "Penicillin",
    current_medication: "Levothyroxine 100mcg",
    emergency_contact: [
      {
        name: "Kyle Connor",
        relationship: "Son",
        phone: "+1-202-555-0133",
      },
    ],
    blood_type: "B+",
    weight: 70,
    height: 168,
    profile_picture: "https://picsum.photos/id/3/200/200",
    tests: [],
  },
  {
    id: "104",
    first_name: "Emily",
    last_name: "Johnson",
    date_of_birth: "1992-07-12",
    gender: "Female",
    date_of_joining: "2021-03-10",

    contact_info: {
      phone: "+1-202-555-0183",
      email: "emilyjohnson@example.com",
      address: "123 Maple St, Springfield, IL",
    },
    medical_history: ["Chronic Migraines"],
    allergies: "Gluten",
    current_medication: "Sumatriptan 50mg",
    emergency_contact: [
      {
        name: "Robert Johnson",
        relationship: "Brother",
        phone: "+1-202-555-0146",
      },
    ],
    blood_type: "AB-",
    weight: 62,
    height: 160,
    profile_picture: "https://picsum.photos/id/4/200/200",
    tests: [
      {
        appointment_id: "94",
        test_id: "cbc",
        status: "Pending",
      },
    ],
  },
  {
    id: "105",
    first_name: "David",
    last_name: "Wilson",
    date_of_birth: "1980-10-25",
    gender: "Male",
    date_of_joining: "2024-01-03",

    contact_info: {
      phone: "+1-202-555-0195",
      email: "davidwilson@example.com",
      address: "321 Pine St, Springfield, IL",
    },
    medical_history: ["High Cholesterol"],
    allergies: "None",
    current_medication: "Atorvastatin 20mg",
    emergency_contact: [
      {
        name: "Laura Wilson",
        relationship: "Wife",
        phone: "+1-202-555-0139",
      },
    ],
    blood_type: "B-",
    weight: 90,
    height: 175,
    profile_picture: "https://picsum.photos/id/5/200/200",
    tests: [
      {
        appointment_id: "95",
        test_id: "lipid_panel",
        status: "Completed",
        date: "2024-09-19",
        result: "file_url",
      },
    ],
  },
  {
    id: "106",
    first_name: "Alice",
    last_name: "Brown",
    date_of_birth: "1982-08-15",
    gender: "Female",
    date_of_joining: "2023-06-16",

    contact_info: {
      phone: "+1-202-555-0123",
      email: "alicebrown@example.com",
      address: "12 Maple St, Springfield, IL",
    },
    medical_history: ["Hypertension"],
    allergies: "None",
    current_medication: "Lisinopril 10mg",
    emergency_contact: [
      {
        name: "Robert Brown",
        relationship: "Husband",
        phone: "+1-202-555-0155",
      },
    ],
    blood_type: "A+",
    weight: 70,
    height: 168,
    profile_picture: "https://picsum.photos/id/6/200/200",
    tests: [],
  },
  {
    id: "107",
    first_name: "Charles",
    last_name: "Davis",
    date_of_birth: "1975-09-30",
    gender: "Male",
    date_of_joining: "2022-11-12",

    contact_info: {
      phone: "+1-202-555-0144",
      email: "charlesdavis@example.com",
      address: "25 Elm St, Springfield, IL",
    },
    medical_history: ["Coronary Artery Disease"],
    allergies: "Aspirin",
    current_medication: "Atorvastatin 20mg",
    emergency_contact: [
      {
        name: "Emma Davis",
        relationship: "Wife",
        phone: "+1-202-555-0190",
      },
    ],
    blood_type: "B+",
    weight: 85,
    height: 175,
    profile_picture: "https://picsum.photos/id/7/200/200",
    tests: [],
  },
  {
    id: "108",
    first_name: "Eva",
    last_name: "Green",
    date_of_birth: "1988-03-14",
    gender: "Female",
    date_of_joining: "2022-12-21",

    contact_info: {
      phone: "+1-202-555-0112",
      email: "evagreen@example.com",
      address: "67 Pine St, Springfield, IL",
    },
    medical_history: ["Epilepsy"],
    allergies: "Penicillin",
    current_medication: "Valproate 500mg",
    emergency_contact: [
      {
        name: "David Green",
        relationship: "Brother",
        phone: "+1-202-555-0177",
      },
    ],
    blood_type: "O-",
    weight: 58,
    height: 162,
    profile_picture: "https://picsum.photos/id/8/200/200",
    tests: [],
  },
  {
    id: "109",
    first_name: "Frank",
    last_name: "Thompson",
    date_of_birth: "1993-11-19",
    gender: "Male",
    date_of_joining: "2021-09-14",

    contact_info: {
      phone: "+1-202-555-0181",
      email: "frankthompson@example.com",
      address: "23 Birch St, Springfield, IL",
    },
    medical_history: ["Migraine"],
    allergies: "Gluten",
    current_medication: "Sumatriptan 50mg",
    emergency_contact: [
      {
        name: "Grace Thompson",
        relationship: "Mother",
        phone: "+1-202-555-0166",
      },
    ],
    blood_type: "AB+",
    weight: 76,
    height: 180,
    profile_picture: "https://picsum.photos/id/9/200/200",
    tests: [],
  },
  {
    id: "110",
    first_name: "Henry",
    last_name: "Walker",
    date_of_birth: "1977-05-24",
    gender: "Male",
    date_of_joining: "2024-02-10",

    contact_info: {
      phone: "+1-202-555-0133",
      email: "henrywalker@example.com",
      address: "34 Cedar St, Springfield, IL",
    },
    medical_history: ["Eczema"],
    allergies: "Latex",
    current_medication: "Hydrocortisone Cream",
    emergency_contact: [
      {
        name: "Linda Walker",
        relationship: "Wife",
        phone: "+1-202-555-0188",
      },
    ],
    blood_type: "B-",
    weight: 82,
    height: 178,
    profile_picture: "https://picsum.photos/id/10/200/200",
    tests: [],
  },
  {
    id: "111",
    first_name: "Isabella",
    last_name: "Moore",
    date_of_birth: "1999-01-16",
    gender: "Female",
    date_of_joining: "2023-04-22",

    contact_info: {
      phone: "+1-202-555-0199",
      email: "isabellamoore@example.com",
      address: "89 Spruce St, Springfield, IL",
    },
    medical_history: ["Acne Vulgaris"],
    allergies: "None",
    current_medication: "Benzoyl Peroxide 5%",
    emergency_contact: [
      {
        name: "Alice Moore",
        relationship: "Mother",
        phone: "+1-202-555-0167",
      },
    ],
    blood_type: "O+",
    weight: 55,
    height: 160,
    profile_picture: "https://picsum.photos/id/11/200/200",
    tests: [],
  },
];
