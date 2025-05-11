"use client";

import { Brain, Download, File, Trash, X } from "lucide-react";
import { useState } from "react";

interface Document {
  id: number;
  name: string;
  size: string;
  date: string;
  content: string;
}

export default function DocumentsLibraryPage() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [aiReadableDocuments, setAiReadableDocuments] = useState<number[]>([]);

  const documents = [
    {
      id: 1,
      name: "Quarterly Budget Report.pdf",
      size: "2.4 MB",
      date: "2023-09-15",
      content:
        "This is a quarterly budget report with financial projections and expense breakdowns for Q3 2023.",
    },
    {
      id: 2,
      name: "Team Handbook.docx",
      size: "1.8 MB",
      date: "2023-08-22",
      content:
        "Company policies, procedures, and guidelines for all team members. Includes code of conduct and remote work policies.",
    },
    {
      id: 3,
      name: "Project Proposal.pdf",
      size: "3.2 MB",
      date: "2023-10-05",
      content:
        "Proposal for the new greenor sustainability project including timeline, budget requirements and expected outcomes.",
    },
    {
      id: 4,
      name: "Financial Statement.xlsx",
      size: "1.1 MB",
      date: "2023-09-30",
      content:
        "Financial statements including balance sheet, income statement, and cash flow statement for FY 2023.",
    },
    {
      id: 5,
      name: "Meeting Minutes.pdf",
      size: "0.8 MB",
      date: "2023-10-12",
      content:
        "Minutes from the latest board meeting including action items and key decisions made.",
    },
  ];

  const toggleAiReadable = (docId: number) => {
    setAiReadableDocuments((prev: number[]) => {
      if (prev.includes(docId)) {
        return prev.filter((id: number) => id !== docId);
      } else {
        return [...prev, docId];
      }
    });
  };

  const openDocument = (doc: Document) => {
    setSelectedDocument(doc);
  };

  const closeDocument = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="p-6 flex h-full">
      <div
        className={`${
          selectedDocument ? "w-3/5" : "w-full"
        } transition-all duration-300`}
      >
        <div className="flex items-center gap-2 mb-6">
          <File className="h-6 w-6 text-teal-600" />
          <h1 className="text-2xl font-bold">Document Library</h1>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b">
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700">
                Upload Document
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                Create Folder
              </button>
            </div>
            <input
              type="text"
              placeholder="Search documents..."
              className="border rounded-md px-3 py-1 w-64"
            />
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Size
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date Added
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => openDocument(doc)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <File className="h-5 w-5 text-gray-400 mr-3" />
                      <div className="text-sm font-medium text-gray-900">
                        {doc.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.date}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className={`text-teal-600 hover:text-teal-900 mr-3 ${
                        aiReadableDocuments.includes(doc.id)
                          ? "bg-teal-50 p-1 rounded"
                          : ""
                      }`}
                      title={
                        aiReadableDocuments.includes(doc.id)
                          ? "AI can read this document"
                          : "Make readable to AI"
                      }
                      onClick={() => toggleAiReadable(doc.id)}
                    >
                      <Brain className="h-4 w-4" />
                    </button>
                    <button className="text-teal-600 hover:text-teal-900 mr-3">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="text-teal-600 hover:text-teal-900">
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document preview panel */}
      {selectedDocument && (
        <div className="w-2/5 ml-4 bg-white rounded-lg shadow p-4 h-[calc(100vh-9rem)] overflow-auto">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <div className="flex items-center">
              <File className="h-5 w-5 text-teal-600 mr-2" />
              <h2 className="text-lg font-medium">{selectedDocument.name}</h2>
            </div>
            <button
              onClick={closeDocument}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mb-4 flex justify-between">
            <div className="text-sm text-gray-500">
              <span>Added: {selectedDocument.date}</span>
              <span className="mx-2">|</span>
              <span>Size: {selectedDocument.size}</span>
            </div>
            <div>
              <button
                className={`text-xs px-2 py-1 rounded-full mr-2 ${
                  aiReadableDocuments.includes(selectedDocument.id)
                    ? "bg-teal-100 text-teal-800"
                    : "bg-gray-100 text-gray-800"
                }`}
                onClick={() => toggleAiReadable(selectedDocument.id)}
              >
                <span className="flex items-center">
                  <Brain className="h-3 w-3 mr-1" />
                  {aiReadableDocuments.includes(selectedDocument.id)
                    ? "AI Readable"
                    : "Not AI Readable"}
                </span>
              </button>
            </div>
          </div>
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="whitespace-pre-line">{selectedDocument.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
