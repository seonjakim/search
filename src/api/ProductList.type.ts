export type ProductListType = {
  club: {
    coverUrl: string;
    description: string;
    id: string;
    meetings: Array<{
      order: number;
      endedAt: string;
      startedAt: string;
    }>;
    name: string;
    place: string;
    type: string;
  };
  createdAt: string;
  leaders: Array<{ name: string }>;
  partners: Array<{ name: string }>;
  price: number;
};
