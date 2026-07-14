"use client";

import {
  FileText,
  Eye,
  Download,
  CheckCircle2,
} from "lucide-react";

type ReportCardProps = {
  title: string;
  audience: string;
  missionId: string;
  generatedAt: string;
  onPreview?: () => void;
  onDownload?: () => void;
};

export default function ReportCard({
  title,
  audience,
  missionId,
  generatedAt,
  onPreview,
  onDownload,
}: ReportCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-cyan-100 p-3">
            <FileText className="h-6 w-6 text-cyan-700" />
          </div>

          <div>

            <h3 className="text-lg font-bold text-slate-900">
              {title}
            </h3>

            <p className="text-sm text-slate-500">
              {audience}
            </p>

          </div>

        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">

          <CheckCircle2 className="h-4 w-4" />

          Ready

        </span>

      </div>

      <div className="mt-6 space-y-2 text-sm">

        <div className="flex justify-between">

          <span className="text-slate-500">
            Mission ID
          </span>

          <span className="font-medium">
            {missionId}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-500">
            Generated
          </span>

          <span className="font-medium">
            {generatedAt}
          </span>

        </div>

      </div>

      <div className="mt-6 flex gap-3">

        <button
          onClick={onPreview}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
        >
          <Eye className="h-4 w-4" />

          Preview

        </button>

        <button
          onClick={onDownload}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          <Download className="h-4 w-4" />

          Download

        </button>

      </div>

    </div>
  );
}