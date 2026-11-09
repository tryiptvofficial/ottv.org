
import { ContentCarousel } from "../shared/ContentCarousel";

interface Item {
  title: string;
  src: string;
  placeholder: string;
}

interface WeeklyBuzzProps {
  items: Item[];
}

export function WeeklyBuzz({ items }: WeeklyBuzzProps) {
  return (
    <ContentCarousel
      items={items}
      title="Top 10"
      subtitle="Movies"
    />
  );
}
