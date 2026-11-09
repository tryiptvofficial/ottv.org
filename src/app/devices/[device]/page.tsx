
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { FaqList } from "@/components/shared/FaqList";
import { Callout } from "@/components/shared/Callout";
import { IconTile } from "@/components/ui/icon-tile";
import { Heading } from "@/components/ui/typography";
import { howToArticles, getSafeArticleData } from "@/lib/how-to";
import { Check, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import InternalLinks from "@/components/shared/InternalLinks";
import { Schema } from "@/components/shared/Schema";
import { generateArticleSchema, generateHowToSchema, generateFAQPageSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { productFacts } from "@/lib/site-data/product-facts";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getPlaceholderImage } from "@/lib/server/image-blur-server";
import { siteConfig } from '@/lib/site-config';

type Props = {
  params: Promise<{ device: string }>;
};

type ArticleType = NonNullable<ReturnType<typeof getSafeArticleData>> & { 
    image?: { 
        imageUrl: string; 
        imageHint: string; 
        width?: number; 
        height?: number; 
        blurDataURL?: string;
    } 
};

async function getArticleData(deviceId: string): Promise<ArticleType | undefined> {
    const article = getSafeArticleData(deviceId);
    if (!article) return undefined;

    const imageInfo = PlaceHolderImages.find(img => img.id === `guide-image-${article.id}`);
    if (!imageInfo) return { ...article, image: undefined };

    const blurDataURL = await getPlaceholderImage(imageInfo.imageUrl);
    return {
        ...article,
        image: {
            ...imageInfo,
            blurDataURL,
        },
    };
}


function StructuredData({ article }: { article: ArticleType }) {
    const { id, title, description, steps, faqs, image, datePublished, dateModified, totalTime } = article;
    const baseUrl = siteConfig.url;

    const articleSchema = generateArticleSchema({
        headline: title,
        description,
        image: image?.imageUrl,
        datePublished,
        dateModified,
        url: `${baseUrl}/devices/${id}`,
    });

    const howToSchema = generateHowToSchema({
        name: title,
        description: description,
        totalTime: totalTime,
        image: image ? {
            url: image.imageUrl,
            width: image.width,
            height: image.height
        } : undefined,
        steps: steps.map((step, index) => ({
            name: step.title,
            text: step.description,
            url: `${baseUrl}/devices/${id}#step-${index + 1}`,
        })),
    });

    const faqSchema = faqs ? generateFAQPageSchema(faqs) : null;
    
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", item: `${baseUrl}/` },
        { name: title, item: `${baseUrl}/devices/${id}` }
    ]);

    return (
        <>
            <Schema id="article" schema={articleSchema} />
            <Schema id="how-to" schema={howToSchema} />
            {faqSchema && <Schema id="faq" schema={faqSchema} />}
            <Schema id="breadcrumb" schema={breadcrumbSchema} />
        </>
    );
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { device } = await params;
  const article = getSafeArticleData(device);

  if (!article) {
    notFound();
  }

  const { title, description } = article;

  return generatePageMetadata({
    title,
    description,
    canonical: `/devices/${device}`,
  });
}

export default async function HowToPage({ params }: Props) {
  const { device } = await params;
  const article = await getArticleData(device);

  if (!article) {
    notFound();
  }
  
  const { title, description, steps, extraSections, faqs, image, primaryKeyword, id, totalTime, dateModified } = article;
  const totalTimeInMinutes = totalTime?.replace('PT', '').replace('M', '');

  return (
    <>
      <StructuredData article={article} />
      <Section>
        <Container>
          <article>
            <PageHeader
              breadcrumb={[{ label: "Home", href: "/" }, { label: title }]}
              title={title}
              lead={description}
            >
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-meta text-subtle">
                {totalTimeInMinutes && (
                  <span className="inline-flex items-center gap-2">
                    <Clock aria-hidden className="h-4 w-4" />
                    Estimated time: {totalTimeInMinutes} minutes
                  </span>
                )}
                <span>
                  Updated:{" "}
                  <time dateTime={dateModified}>{new Date(dateModified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </span>
              </div>
            </PageHeader>

            {/* Article layout: a reading column of about 760px beside a sidebar on desktop */}
            <div className="grid grid-cols-1 gap-12 xl:grid-cols-article">
              <div className="prose max-w-narrow">
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>What You&apos;ll Need</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-muted-foreground">
                      {[`A compatible ${primaryKeyword}`, "A stable internet connection", "An active IPTV subscription", "Your M3U link or credentials"].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <h2>Step-by-Step Installation Guide for {primaryKeyword}</h2>
                <p>Follow these simple steps to get IPTVMax running on your {primaryKeyword}. The entire process should only take a few minutes.</p>
                <ol className="not-prose mt-8 space-y-8">
                  {steps.map((step, index) => (
                    <li key={index} id={`step-${index + 1}`} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <IconTile size="md" className="font-mono">{String(index + 1).padStart(2, "0")}</IconTile>
                        {index < steps.length - 1 && <div className="mt-2 w-px flex-grow bg-border" />}
                      </div>
                      <div className="pb-2">
                        <Heading level={3} size="subheading" className="mb-2 mt-2">{step.title}</Heading>
                        <div className="prose" dangerouslySetInnerHTML={{ __html: step.description }} />
                      </div>
                    </li>
                  ))}
                </ol>

                {extraSections?.map(section => (
                  <section key={section.id}>
                    <h2>{section.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  </section>
                ))}

                <Callout
                  level={3}
                  className="not-prose my-12"
                  title={`Ready to Start Watching on Your ${primaryKeyword}?`}
                  action={
                    <Button asChild size="lg">
                      <Link href="/pricing">Get Your Subscription Now</Link>
                    </Button>
                  }
                >
                  Get an IPTVMax subscription for {productFacts.summary}.
                </Callout>

                {faqs && (
                  <>
                    <h2>Frequently Asked Questions</h2>
                    <FaqList items={faqs} className="not-prose mt-8 max-w-none" />
                  </>
                )}
              </div>
              <aside className="w-full max-w-narrow space-y-6 xl:sticky xl:top-24 xl:self-start">
                {image && image.blurDataURL && (
                  <Card className="overflow-hidden">
                    <Image
                      src={image.imageUrl}
                      alt={`${primaryKeyword} - ${title}`}
                      width={image.width || 600}
                      height={image.height || 400}
                      data-ai-hint={image.imageHint}
                      loading="lazy"
                      sizes="(max-width: 1279px) 100vw, 400px"
                      className="h-auto w-full"
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                    />
                  </Card>
                )}
                <InternalLinks currentId={id} />
              </aside>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}

export async function generateStaticParams() {
  return howToArticles.map((article) => ({
    device: article.id,
  }));
}
