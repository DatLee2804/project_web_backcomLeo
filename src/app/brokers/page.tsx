import { BrokersExplorer } from "@/components/brokers/brokers-explorer";
import { Badge } from "@/components/ui/badge";
import { getLiveBrokers, getSitePagesContent } from "@/lib/cms";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Danh sách Sàn giao dịch Đối tác (Brokers)",
  description:
    "Khám phá và so sánh các sàn giao dịch đối tác trong hệ sinh thái Backcom Mr Leo: Austex Markets (ưu tiên mặc định STD05), Exness, Tickmill, FxPro và BCR.",
  path: "/brokers",
});

export default async function BrokersListingPage() {
  const [brokers, sitePages] = await Promise.all([
    getLiveBrokers(),
    getSitePagesContent(),
  ]);

  const bp = sitePages.brokersPage;

  return (
    <div className="bg-background py-14 sm:py-18 lg:py-22">
      <div className="container">
        <div className="max-w-3xl">
          <Badge variant="gold">{bp.hero.badge}</Badge>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
            {bp.hero.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
            {bp.hero.description}
          </p>
        </div>

        <div className="mt-10">
          <BrokersExplorer
            brokersList={brokers}
            comparisonHeading={bp.comparisonTable}
          />
        </div>
      </div>
    </div>
  );
}

