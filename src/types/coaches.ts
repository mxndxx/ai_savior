export interface Coach {
  id: string;
  name: string;
  specialty: string;
  image: string;
  achievements: string[];
  link: string;
}

export interface CoachCardProps {
  coach: Coach;
  isActive: boolean;
  onClick: () => void;
  isMobile: boolean;
}
