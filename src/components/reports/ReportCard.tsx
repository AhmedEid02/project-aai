"use client";

import {
  FileText,
  Eye,
  Download,
  CheckCircle2,
  Shield,
  Clock3,
  Users,
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
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 text-white">

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-cyan-500/20 p-3">
              <FileText className="h-6 w-6 text-cyan-300" />
            </div>

            <div>

              <h3 className="text-lg font-bold leading-tight">
                {title}
              </h3>

              <p className="mt-1 text-xs uppercase tracking-wider text-slate-300">
                Operational Intelligence Product
              </p>

            </div>

          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            Ready
          </span>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-5 p-6">

        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

          <div className="mb-3 flex items-center gap-2">

            <Users className="h-4 w-4 text-cyan-700" />

            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Target Audience
            </span>

          </div>

          <p className="font-medium text-slate-800">
            {audience}
          </p>

        </div>

        <div className="space-y-3">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2 text-slate-500">

              <Shield className="h-4 w-4" />

              <span className="text-sm">
                Mission ID
              </span>

            </div>

            <span className="font-semibold text-slate-800">
              {missionId}
            </span>

          </div>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2 text-slate-500">

              <Clock3 className="h-4 w-4" />

              <span className="text-sm">
                Generated
              </span>

            </div>

            <span className="font-medium text-slate-800">
              {generatedAt}
            </span>

          </div>

        </div>

        <div className="rounded-xl border border-cyan-100 bg-cyan-50 p-3">

          <p className="text-sm text-slate-700">
            This operational product is generated from the latest fused
            climate, impact, and decision intelligence to support timely
            coordination and early action.
          </p>

        </div>

      </div>

      {/* Footer */}

      <div className="flex gap-3 border-t border-slate-100 p-5">

        <button
          onClick={onPreview}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-medium transition hover:bg-slate-100"
        >
          <Eye className="h-4 w-4" />
          Preview
        </button>

        <button
          onClick={onDownload}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-800"
        >
          <Download className="h-4 w-4" />
          PDF
        </button>

      </div>

    </div>
  );
}