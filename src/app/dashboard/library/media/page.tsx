"use client";

import { Film } from "lucide-react";

export default function MediaLibraryPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Film className="h-6 w-6 text-teal-600" />
        <h1 className="text-2xl font-bold">Media Library</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <Film className="h-10 w-10 text-gray-400" />
              </div>
              <div className="p-3">
                <h3 className="font-medium">Sample Media {i + 1}</h3>
                <p className="text-sm text-gray-500">
                  Added on {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Upload button */}
        <div className="mt-6">
          <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
            Upload New Media
          </button>
        </div>
      </div>
    </div>
  );
}
