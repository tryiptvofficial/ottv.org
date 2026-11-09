
interface SchemaProps {
  // Any JSON-LD node; the generators in @/lib/schema type the contents.
  schema: { '@context': 'https://schema.org' };
  id: string;
}

export function Schema({ schema, id }: SchemaProps) {
  return (
    <script
      id={`schema-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
