"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ClipboardCheck,
  ClipboardCopy,
  FileText,
  Languages,
  Loader2,
  Megaphone,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

type OperationalProductType =
  | "situation-report"
  | "government-note"
  | "humanitarian-note"
  | "community-advisory"
  | "somali-message";

type OperationalProduct = {
  type: OperationalProductType;
  title: string;
  audience: string;
  productCode: string;
  generatedAt: string;
  scenarioName: string;
  riskSummary: string;
  sections: {
    heading: string;
    content: string | string[];
  }[];
};

type ProductApiResponse = {
  generatedAt: string;
  product: OperationalProduct;
};

const products: {
  id: OperationalProductType;
  label: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    id: "situation-report",
    label: "Situation Report",
    description: "Senior operating picture",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "government-note",
    label: "Government Note",
    description: "DRM and ministries",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    id: "humanitarian-note",
    label: "Humanitarian Note",
    description: "Partner coordination",
    icon: <UsersRound className="h-4 w-4" />,
  },
  {
    id: "community-advisory",
    label: "Community Advisory",
    description: "Local action message",
    icon: <Megaphone className="h-4 w-4" />,
  },
  {
    id: "somali-message",
    label: "Somali Message",
    description: "Last-mile Somali version",
    icon: <Languages className="h-4 w-4" />,
  },
];

export function OperationalProductsPanel({
  scenarioId,
}: {
  scenarioId: string;
}) {
  const [selectedProduct, setSelectedProduct] =
    useState<OperationalProductType>("situation-report");
  const [data, setData] = useState<ProductApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copyStatus, setCopyStatus] = useState("Copy product");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        setCopyStatus("Copy product");

        const response = await fetch(
          `/api/products?scenario=${scenarioId}&type=${selectedProduct}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          throw new Error("Unable to generate operational product.");
        }

        const payload = (await response.json()) as ProductApiResponse;

        if (isMounted) {
          setData(payload);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unexpected operational product error.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [scenarioId, selectedProduct]);

  const activeProduct = useMemo(
    () => products.find((product) => product.id === selectedProduct),
    [selectedProduct],
  );

  async function handleCopy(product: OperationalProduct) {
    await navigator.clipboard.writeText(formatProduct(product));
    setCopyStatus("Copied");
    window.setTimeout(() => setCopyStatus("Copy product"), 1800);
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-2xl">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">
            <ClipboardCheck className="h-4 w-4" />
            Operational Products
          </div>

          <h2 className="mt-3 text-2xl font-bold text-white">
            Generate deployable early-action products
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            This converts ARIE and AIDA intelligence into structured products that
            governments, humanitarian partners, and communities can act on.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 xl:min-w-80">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Product type
          </div>

          <select
            value={selectedProduct}
            onChange={(event) =>
              setSelectedProduct(event.target.value as OperationalProductType)
            }
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-semibold text-white outline-none transition focus:border-emerald-400"
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.label}
              </option>
            ))}
          </select>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            {activeProduct?.description}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-5">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => setSelectedProduct(product.id)}
            className={`rounded-2xl border p-3 text-left transition ${
              selectedProduct === product.id
                ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
                : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              {product.icon}
              {product.label}
            </div>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              {product.description}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-5">
        {isLoading ? (
          <div className="flex min-h-72 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-300" />
              <p className="mt-3 text-sm font-semibold text-white">
                Generating operational product
              </p>
            </div>
          </div>
        ) : errorMessage || !data ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-950/30 p-5">
            <p className="text-sm font-semibold text-red-100">
              Product unavailable
            </p>
            <p className="mt-2 text-sm text-red-100/80">
              {errorMessage ?? "The products API did not return a valid product."}
            </p>
          </div>
        ) : (
          <ProductCard
            product={data.product}
            copyStatus={copyStatus}
            onCopy={() => handleCopy(data.product)}
          />
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  copyStatus,
  onCopy,
}: {
  product: OperationalProduct;
  copyStatus: string;
  onCopy: () => void;
}) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
            {product.productCode}
          </div>

          <h3 className="mt-2 text-2xl font-bold text-white">
            {product.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            {product.scenarioName} — {product.riskSummary}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Audience: {product.audience}
          </p>
        </div>

        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
        >
          <ClipboardCopy className="h-4 w-4" />
          {copyStatus}
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {product.sections.map((section) => (
          <section
            key={section.heading}
            className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
          >
            <h4 className="text-sm font-semibold text-white">
              {section.heading}
            </h4>

            {Array.isArray(section.content) ? (
              <div className="mt-3 space-y-2">
                {section.content.map((item) => (
                  <div
                    key={item}
                    className="flex gap-2 text-sm leading-6 text-slate-300"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {section.content}
              </p>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}

function formatProduct(product: OperationalProduct) {
  return [
    `${product.productCode}: ${product.title}`,
    `Scenario: ${product.scenarioName}`,
    `Risk: ${product.riskSummary}`,
    `Audience: ${product.audience}`,
    "",
    ...product.sections.flatMap((section) => [
      section.heading,
      ...(Array.isArray(section.content)
        ? section.content.map((item) => `- ${item}`)
        : [section.content]),
      "",
    ]),
  ].join("\n");
}