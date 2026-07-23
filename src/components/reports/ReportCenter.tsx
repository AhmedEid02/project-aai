"use client";

import { useMemo, useState } from "react";
import { FileText, ShieldCheck } from "lucide-react";

import type { Assessment } from "@/lib/intelligence";
import {
  buildOperationalProducts,
  exportReportAsPdf,
  type OperationalReport,
} from "@/lib/reports";

import ReportCard from "./ReportCard";
import ReportPreview from "./ReportPreview";

type Props = {
  assessment: Assessment;
};

export default function ReportCenter({
  assessment,
}: Props) {

  const reports = useMemo(
    () => buildOperationalProducts(assessment),
    [assessment]
  );

  const [selectedReport, setSelectedReport] =
    useState<OperationalReport | null>(null);

  return (
    <section className="space-y-6">

      {/* ================================================= */}
      {/* Header */}
      {/* ================================================= */}

      <div className="rounded-2xl border bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow">

        <div className="flex items-center gap-3">

          <FileText className="h-8 w-8 text-cyan-400" />

          <div>

            <h2 className="text-2xl font-bold">
              Operational Products
            </h2>

            <p className="mt-1 text-sm text-slate-300">
              Automatically generated operational products ready for
              coordination, decision support and field action.
            </p>

          </div>

        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-4">

          <div className="rounded-xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-300">
              Products
            </p>

            <p className="mt-2 text-3xl font-bold">
              {reports.length}
            </p>
          </div>

          <div className="rounded-xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-300">
              Risk Level
            </p>

            <p className="mt-2 text-3xl font-bold">
              {assessment.riskLevel}
            </p>
          </div>

          <div className="rounded-xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-300">
              Confidence
            </p>

            <p className="mt-2 text-3xl font-bold">
              {assessment.confidence}%
            </p>
          </div>

          <div className="rounded-xl bg-white/10 p-4">

            <div className="flex items-center gap-2">

              <ShieldCheck className="h-5 w-5 text-emerald-300" />

              <span className="text-sm">
                Operationally Ready
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* Reports */}
      {/* ================================================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        {reports.map((report) => (

          <ReportCard
            key={report.type}
            title={report.title}
            audience={report.audience}
            missionId={report.metadata.missionId}
            generatedAt={report.metadata.generatedAt}
            onPreview={() => setSelectedReport(report)}
            onDownload={() => exportReportAsPdf(report)}
          />

        ))}

      </div>

      {/* ================================================= */}
      {/* Preview */}
      {/* ================================================= */}

      {selectedReport && (

        <ReportPreview
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />

      )}

    </section>
  );

}