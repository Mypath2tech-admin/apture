"use client";

import { Brain, Download, File, Trash, X, Upload, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

interface Document {
  id: string;
  name: string;
  fileName: string;
  size: string;
  date: string;
  mimeType: string;
  isAiReadable: boolean;
  isYearPlan: boolean;
  embeddingCount?: number;
  hasEmbeddings?: boolean;
}

export default function DocumentsLibraryPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch documents on mount
  useEffect(() => {
    fetchDocuments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/documents");
      
      if (!response.ok) {
        throw new Error("Failed to fetch documents");
      }

      const data = await response.json();
      setDocuments(data.documents || []);
      
      // Update selected document if it exists in the new list
      if (selectedDocument) {
        const updatedDoc = data.documents?.find((d: Document) => d.id === selectedDocument.id);
        if (updatedDoc) {
          setSelectedDocument(updatedDoc);
        }
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only PDF, Word documents, and text files are allowed.");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds maximum of 10MB");
      return;
    }

    await uploadFile(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload document");
      }

      const data = await response.json();
      toast.success(`Document "${data.name}" uploaded successfully${data.isYearPlan ? " (detected as 3-Year Plan)" : ""}`);
      
      // Refresh documents list
      await fetchDocuments();
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error(error instanceof Error ? error.message : "Failed to upload document");
    } finally {
      setIsUploading(false);
    }
  };

  const toggleAiReadable = async (docId: string, currentValue: boolean) => {
    try {
      setIsToggling(docId);
      const response = await fetch("/api/documents", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId: docId,
          isAiReadable: !currentValue,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update document");
      }

      const responseData = await response.json();
      
      if (!currentValue) {
        // Enabling AI readability
        if (responseData.hasEmbeddings && responseData.embeddingCount > 0) {
          toast.success(`Document enabled for AI reading. ${responseData.embeddingCount} chunks embedded.`);
        } else {
          toast.warning("Document enabled for AI reading, but embeddings may still be processing.");
        }
      } else {
        toast.success("Document disabled for AI reading");
      }
      
      // Update local state with embedding info
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === docId
            ? {
                ...doc,
                isAiReadable: responseData.isAiReadable,
                embeddingCount: responseData.embeddingCount || 0,
                hasEmbeddings: responseData.hasEmbeddings || false,
              }
            : doc
        )
      );
      
      if (selectedDocument?.id === docId) {
        setSelectedDocument((prev) =>
          prev
            ? {
                ...prev,
                isAiReadable: responseData.isAiReadable,
                embeddingCount: responseData.embeddingCount || 0,
                hasEmbeddings: responseData.hasEmbeddings || false,
              }
            : null
        );
      }
    } catch (error) {
      console.error("Error toggling AI readable:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update document");
    } finally {
      setIsToggling(null);
    }
  };

  const handleDelete = async (docId: string, docName: string) => {
    if (!confirm(`Are you sure you want to delete "${docName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setIsDeleting(docId);
      const response = await fetch(`/api/documents?id=${docId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete document");
      }

      toast.success("Document deleted successfully");
      
      // Remove from local state
      setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
      
      if (selectedDocument?.id === docId) {
        setSelectedDocument(null);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete document");
    } finally {
      setIsDeleting(null);
    }
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
              <button
                onClick={handleUploadClick}
                disabled={isUploading}
                className="px-3 py-1 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload Document
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <input
              type="text"
              placeholder="Search documents..."
              className="border rounded-md px-3 py-1 w-64"
            />
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-teal-600" />
              <p className="mt-2 text-gray-500">Loading documents...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="p-8 text-center">
              <File className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No documents yet. Upload your first document to get started.</p>
            </div>
          ) : (
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
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {doc.name}
                          </div>
                          {doc.isYearPlan && (
                            <div className="text-xs text-teal-600 mt-1">
                              3-Year Plan
                            </div>
                          )}
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
                        className={`mr-3 p-1 rounded transition-colors ${
                          isToggling === doc.id
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-100"
                        } ${
                          doc.isAiReadable && doc.hasEmbeddings
                            ? "text-teal-600 bg-teal-50"
                            : doc.isAiReadable && !doc.hasEmbeddings
                            ? "text-orange-500 bg-orange-50"
                            : "text-gray-400"
                        }`}
                        title={
                          doc.isAiReadable && doc.hasEmbeddings
                            ? `AI can read this document (${doc.embeddingCount || 0} chunks)`
                            : doc.isAiReadable && !doc.hasEmbeddings
                            ? "AI readability enabled but embeddings missing"
                            : "Make readable to AI"
                        }
                        onClick={() => toggleAiReadable(doc.id, doc.isAiReadable)}
                        disabled={isToggling === doc.id}
                      >
                        {isToggling === doc.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Brain className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        className="text-teal-600 hover:text-teal-900 mr-3"
                        title="Download document"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Implement download functionality
                          toast.info("Download functionality coming soon");
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        className={`text-teal-600 hover:text-teal-900 ${
                          isDeleting === doc.id ? "opacity-50" : ""
                        }`}
                        title="Delete document"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(doc.id, doc.name);
                        }}
                        disabled={isDeleting === doc.id}
                      >
                        {isDeleting === doc.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash className="h-4 w-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
                className={`text-xs px-2 py-1 rounded-full mr-2 transition-colors ${
                  selectedDocument.isAiReadable && selectedDocument.hasEmbeddings
                    ? "bg-teal-100 text-teal-800"
                    : selectedDocument.isAiReadable && !selectedDocument.hasEmbeddings
                    ? "bg-orange-100 text-orange-800"
                    : "bg-gray-100 text-gray-800"
                }`}
                onClick={() => toggleAiReadable(selectedDocument.id, selectedDocument.isAiReadable)}
                disabled={isToggling === selectedDocument.id}
              >
                <span className="flex items-center">
                  {isToggling === selectedDocument.id ? (
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  ) : (
                    <Brain className="h-3 w-3 mr-1" />
                  )}
                  {selectedDocument.isAiReadable && selectedDocument.hasEmbeddings
                    ? `AI Readable (${selectedDocument.embeddingCount || 0} chunks)`
                    : selectedDocument.isAiReadable && !selectedDocument.hasEmbeddings
                    ? "AI Readable (processing...)"
                    : "Not AI Readable"}
                </span>
              </button>
            </div>
          </div>
          {selectedDocument.isYearPlan && (
            <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-md">
              <p className="text-sm text-teal-800">
                <strong>Plan Document:</strong> This document has been detected as a plan document. Enable AI readability to use it for generating timesheet descriptions and AI chat.
              </p>
            </div>
          )}
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="text-sm text-gray-600">
              Document preview is not available. Use the download button to view the full document.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
