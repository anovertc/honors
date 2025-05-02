export const yearOptions = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate Student"];

export const careerInterests = [
  "Software Engineering",
  "Data Science / Machine Learning",
  "Cybersecurity",
  "Web Development",
  "Systems/Hardware Engineering",
  "Research / Academia",
  "Other",
];

export const classOptions = [
  "CSE 402 Biometrics and Pattern Recognition",
  "CSE 404 Introduction to Machine Learning",
  "CSE 410 Operating Systems",
  "CSE 415 Introduction to Parallel Programming",
  "CSE 420 Computer Architecture",
  "CSE 422 Computer Networks",
  "CSE 425 Introduction to Computer Security",
  "CSE 431 Algorithm Engineering",
  "CSE 434 Autonomous Vehicles",
  "CSE 435 Software Engineering",
  "CSE 440 Introduction to Artificial Intelligence",
  "CSE 450 Translation of Programming Languages",
  "CSE 460 Computability and Formal Language Theory",
  "CSE 471 Media Processing and Multimedia Computing",
  "CSE 472 Computer Graphics",
  "CSE 476 Mobile Application Development",
  "CSE 477 Web Application Architecture and Development",
  "CSE 480 Database Systems",
  "CSE 482 Big Data Analysis",
  "CSE 491 Selected Topics in Computer Science",
  "MTH 451 Numerical Analysis I",
];

export const mandatoryClasses = [
  "CSE 231 - Intro to Programming",
  "CSE 232 - Programming II",
  "CSE 320 - Computer Architecture",
  "CSE 331 - Algorithms & Data Structures",
  "CSE 335 - Object-Oriented Design",
  "CSE 325 - Computer Systems",
];

export type MandatoryClassRating = {
  className: string;
  rating: number | null;                // 0 = not taken
  expectation?: number;                 // if not taken
  gpa?: number | null;                  // if taken
  lectureQuality?: number | null;      // if taken
  support?: number | null;             // if taken
  careerRelevance?: number | null;     // if taken
  priorExperience?: string | null;     // 👈 add null here
};

export type SurveyAnswers = {
  year: string;
  careerInterests: string[];
  priorExperience: string;
  courseName: string;
  enjoyment: number;
  lectureQuality: number;
  supportAvailability: number;
  careerRelevance: number;
  workload: string;
  expectedGrade?: string;
  advice: string;
  extraNotes?: string;
  topClasses: {
    className: string;
    rating: number | null;
  }[];
  mandatoryClasses: MandatoryClassRating[];
};







