export type Beer = {
  id: number;
  name: string;
  description: string;
  brewery: string;
  alcohol: string;
  price: string;
};

export type Vote = {
  id: number;
  user_id: number;
  event_id: number;
  beer_id: number;
  points_taste: number;
  points_design: number;
  points_bonus: number;
};
