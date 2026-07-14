"use client";

import type { OperationalReport } from "@/lib/reports";

type ReportPreviewProps = {
  report: OperationalReport | null;
  onClose: () => void;
};

export default function ReportPreview({
  report,
  onClose,
}: ReportPreviewProps) {

  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">

      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        <div className="border-b p-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-bold">
                {report.title}
              </h2>

              <p className="mt-2 text-slate-500">
                {report.audience}
              </p>

            </div>

            <button
              onClick={onClose}
              className="rounded-lg border px-4 py-2 hover:bg-slate-100"
            >
              Close
            </button>

          </div>

        </div>

        <div className="space-y-6 p-8">

          <div className="grid gap-4 md:grid-cols-2">

            <div>

              <div className="text-sm text-slate-500">
                Mission ID
              </div>

              <div className="font-semibold">
                {report.metadata.missionId}
              </div>

            </div>

            <div>

              <div className="text-sm text-slate-500">
                Generated
              </div>

              <div className="font-semibold">
                {report.metadata.generatedAt}
              </div>

            </div>

          </div>

          {report.sections.map((section) => (

            <section
              key={section.title}
              className="rounded-2xl border p-5"
            >

              <h3 className="mb-3 text-xl font-bold">
                {section.title}
              </h3>

              <p className="whitespace-pre-line leading-7 text-slate-700">
                {section.content}
              </p>

            </section>

          ))}

        </div>

      </div>

    </div>
  );
}