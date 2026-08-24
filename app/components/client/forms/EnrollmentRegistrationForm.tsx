"use client";

import z from "zod";

export enum LEARNING_REASON {
  CAREER = "CAREER",
  TRAVEL = "TRAVEL",
  ABROAD = "ABROAD",
  HOBBY = "HOBBY",
  OTHERS = "OTHERS"
}

export interface LEARNING_REASON_TEXT {
  [LEARNING_REASON.CAREER]: "Career or Spanish bilingual opportunities",
  [LEARNING_REASON.TRAVEL]: "Travel",
  [LEARNING_REASON.HOBBY]: "Personal growth or hobby",
  [LEARNING_REASON.ABROAD]: "Living abroad or communicating with family/friends",
  [LEARNING_REASON.OTHERS]: "Others:"
};


export enum SPANISH_PROFICIENCY {
  COMPLETE_BEGINNER = "COMPLETE_BEGINNER",
  BEGINNER = "BEGINNER",
  ELEMENTARY = "ELEMENTARY",
  REFRESHER = "REFRESHER" 
}

export interface SPANISH_PROFICIENCY_TEXT {
  [SPANISH_PROFICIENCY.COMPLETE_BEGINNER]: "I have never studied Spanish before",
  [SPANISH_PROFICIENCY.BEGINNER]: "I know a few words or basic phrases",
  [SPANISH_PROFICIENCY.ELEMENTARY]: "I can make simple sentences but need structure",
  [SPANISH_PROFICIENCY.REFRESHER]: "I have studied before but want to restart from the basics"
};


export const EnrollmentRegistrationForm = () => {
  const formSchema = z.object({
    // Personal Details
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    number: z.string().regex(/^\d{10,12}$/, {
      message: "Please enter valid mobile number",
    }),
    province: z.string("Province is required"),
    cityMunicipality: z.string("City or municipality is required"),
    facebook: z.string().min(2, "Facebook name must be at least 2 characters"),
    facebookUrl: z.url({ message: 'Must be a valid URL' }).regex(/^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com)\/.+$/i,
      { message: 'Must be a valid Facebook link' }
    ),
    occupation: z.string().optional(),
    course: z.string().optional(),

    // Spanish Proficiency
    proficiency: z.enum(SPANISH_PROFICIENCY),
    hasStudySpanish: z.boolean(),
    studySpanishIn: z.string().min(2, "Must be at least 2 characters"),
    learningReason: z.enum(LEARNING_REASON),
    otherReason: z.string().min(2, "Must be at least 2 characters")
  });
  
  type FormData = z.infer<typeof formSchema>;
  

  return (
    <></>
  )
}