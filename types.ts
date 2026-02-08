
export type Screen = 
  | 'DASHBOARD' 
  | 'GUIDE' 
  | 'COMPETENCY' 
  | 'DEFINITION' 
  | 'ANALYSIS' 
  | 'DESIGN' 
  | 'IMPLEMENTATION' 
  | 'EVALUATION' 
  | 'SUCCESS';

export interface Material {
  id?: string;
  step_key: string;
  title: string;
  content: {
    body: string;
    items?: string[];
  };
  image_url?: string;
}

export interface UserActivity {
  analysis?: {
    relevant_values: string;
    impact: string;
  };
  design?: {
    steps: string;
    argument: string;
  };
  implementation?: {
    journal: string;
    image_attached?: boolean;
  };
  evaluation?: {
    most_difficult: string;
    challenge_reason: string;
    important_lesson: string;
    improvement_plan: string;
  };
}
