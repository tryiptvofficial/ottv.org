
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { FaqList } from "@/components/shared/FaqList";
import { Callout } from "@/components/shared/Callout";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { IconTile } from "@/components/ui/icon-tile";
import { Heading } from "@/components/ui/typography";
import { howToArticles, getSafeArticleData } from "@/lib/how-to";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
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

// Each guide links to the closest alternatives for the same kind of screen.
const relatedGuides: Record<string, string[]> = {
  "fire-tv": ["roku", "apple-tv", "android"],
  android: ["ios", "fire-tv", "windows"],
  ios: ["android", "apple-tv", "macos"],
  windows: ["macos", "android", "fire-tv"],
  macos: ["windows", "ios", "apple-tv"],
  "samsung-tv": ["lg-tv", "apple-tv", "fire-tv"],
  "lg-tv": ["samsung-tv", "apple-tv", "fire-tv"],
  "apple-tv": ["ios", "macos", "fire-tv"],
  roku: ["fire-tv", "ios", "android"],
  mag: ["samsung-tv", "lg-tv", "fire-tv"],
  troubleshooting: ["fire-tv", "android", "samsung-tv"],
};

function relatedLinks(id: string) {
  const guides = (relatedGuides[id] ?? []).flatMap((relatedId) => {
    const guide = howToArticles.find((item) => item.id === relatedId);
    return guide ? [{ href: `/devices/${guide.id}`, title: guide.title }] : [];
  });
  return [
    ...guides,
    ...(id === "troubleshooting" ? [] : [{ href: "/devices/troubleshooting", title: "Fix IPTV buffering" }]),
    { href: "/iptv-free-trial", title: "How the 24-hour free trial works" },
    { href: "/pricing", title: "OTTV plans and prices" },
  ];
}

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

  const { title, metaDescription } = article;

  return generatePageMetadata({
    title,
    description: metaDescription,
    canonical: `/devices/${device}`,
  });
}

export default async function HowToPage({ params }: Props) {
  const { device } = await params;
  const article = await getArticleData(device);

  if (!article) {
    notFound();
  }
  
  const { title, description, steps, extraSections, faqs, image, imageAlt, deviceName, id, totalTime, dateModified, notice, sources } = article;
  // The troubleshooting guide is not tied to one device, so it has its own wording.
  const requirements = deviceName
    ? [`A compatible ${deviceName}`, "A stable internet connection", "An active OTTV plan or free trial", "Your login details (Xtream Codes login or M3U link)"]
    : ["Your streaming device and router", "A way to run an internet speed test", "An Ethernet cable, if your device has a port", "Access to your IPTV app's settings"];
  const deviceHeading = deviceName.replace(/ device$/, " Device");
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
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-meta text-subtle">
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
                <span>Checked against vendor documentation, not re-tested on every device or app version.</span>
                {sources && (
                  <span>
                    Sources:{" "}
                    {sources.map((source, i) => (
                      <span key={source.url}>
                        {i > 0 && ", "}
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-link">{source.label}</a>
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </PageHeader>

            {/* Article layout: a reading column of about 760px beside a sidebar on desktop */}
            <div className="grid grid-cols-1 gap-12 xl:grid-cols-article">
              <div className="prose max-w-narrow">
                {notice && (
                  <p role="note" className="not-prose mb-6 rounded-card border p-4 text-body text-muted-foreground [&_a]:text-link" dangerouslySetInnerHTML={{ __html: notice }} />
                )}
                <Card className="not-prose">
                  <CardHeader>
                    <Heading level={2} size="subheading">What You&apos;ll Need</Heading>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-muted-foreground">
                      {requirements.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-foreground" /> {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-caption text-muted-foreground">
                      No login yet? <Link href="/iptv-free-trial" className="text-link">Request the free 24-hour trial</Link> or{" "}
                      <Link href="/pricing" className="text-link">see the plans</Link>.
                    </p>
                  </CardContent>
                </Card>

                <h2>{deviceName ? `How to Set Up OTTV on Your ${deviceHeading}` : "Step-by-Step Fixes for IPTV Buffering"}</h2>
                <p>
                  {deviceName
                    ? "App names and menus change between versions. If a screen looks different from these steps, "
                    : "Work through these steps in order and test your stream after each one. If it still buffers, "}
                  <WhatsAppLink className="text-link">message us on WhatsApp</WhatsAppLink>.
                </p>
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
                  className="not-prose my-12"
                  title={deviceName ? `Ready to Start Watching on Your ${deviceHeading}?` : "Need an OTTV Subscription?"}
                  action={
                    <Button asChild size="lg">
                      <Link href="/pricing">Get Your Subscription Now</Link>
                    </Button>
                  }
                >
                  Get an OTTV subscription for {productFacts.summary}.
                </Callout>

                {faqs && (
                  <>
                    <h2>Frequently Asked Questions</h2>
                    <FaqList items={faqs} columns={1} className="not-prose mt-8 max-w-none" />
                  </>
                )}
              </div>
              <div className="w-full max-w-narrow space-y-6 xl:sticky xl:top-24 xl:self-start">
                {image && image.blurDataURL && (
                  <Card className="overflow-hidden">
                    <Image
                      src={image.imageUrl}
                      alt={imageAlt}
                      width={image.width || 600}
                      height={image.height || 400}
                      loading="lazy"
                      sizes="(max-width: 1279px) 100vw, 400px"
                      className="h-auto w-full"
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                    />
                  </Card>
                )}
                <Card className="not-prose">
                  <CardHeader>
                    <Heading level={2} size="subheading">Related Articles</Heading>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {relatedLinks(id).map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group flex items-center justify-between gap-3 rounded-control text-muted-foreground transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <span>{link.title}</span>
                            <ArrowRight aria-hidden className="h-4 w-4 shrink-0 opacity-0 transition-opacity duration-fast group-hover:opacity-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
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
