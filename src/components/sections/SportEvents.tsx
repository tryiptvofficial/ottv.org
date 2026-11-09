
import { ContentCarousel } from "../shared/ContentCarousel";

interface Item {
  title: string;
  src: string;
  placeholder: string;
}

interface SportEventsProps {
  items: Item[];
}

export function SportEvents({ items }: SportEventsProps) {
  return (
    <ContentCarousel
      items={items}
      title="Sport"
      subtitle="Events"
    />
  );
}
