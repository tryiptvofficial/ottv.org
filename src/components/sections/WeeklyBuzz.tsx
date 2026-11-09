
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
    <ContentCarousel tone="light"
      items={items}
      subtitle="Top 10 Movies"
    />
  );
}
