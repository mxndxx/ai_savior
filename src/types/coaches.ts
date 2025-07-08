export interface Coach {
  id: string;
  name: string;
  bio: string;
  career: string;
  profile_image: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCoachForm {
  name: string;
  bio: string;
  career: string;
}

export interface CoachCardProps {
  coach: Coach;
  isActive: boolean;
  onClick: () => void;
  isMobile: boolean;
}
