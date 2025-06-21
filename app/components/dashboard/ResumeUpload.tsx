import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";

interface ResumeUploadProps {
  isUploading: boolean;
  uploadProgress: number;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ResumeUpload({ isUploading, uploadProgress, onFileUpload }: ResumeUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
    setDragError(null);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      
      // Validate file type
      if (!file.type.includes('pdf') && !file.type.includes('word')) {
        setDragError('Please upload a PDF or DOCX file');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setDragError('File size must be less than 10MB');
        return;
      }
      
      // Create a synthetic event
      const syntheticEvent = {
        target: { files: [file] }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onFileUpload(syntheticEvent);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Your Resume</h2>
        <p className="text-slate-600 mb-6">Get AI-powered analysis and insights to improve your resume</p>
        
        {isUploading ? (
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="w-full bg-slate-200 rounded-full h-3 mb-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out relative"
                  style={{ width: `${uploadProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
            </div>
            
            {/* Upload Steps Animation */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Validating file</span>
                <div className={`w-3 h-3 rounded-full ${uploadProgress >= 10 ? 'bg-green-500 animate-bounce' : 'bg-gray-300'}`}></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Preparing upload</span>
                <div className={`w-3 h-3 rounded-full ${uploadProgress >= 25 ? 'bg-green-500 animate-bounce' : 'bg-gray-300'}`}></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Uploading to cloud</span>
                <div className={`w-3 h-3 rounded-full ${uploadProgress >= 50 ? 'bg-green-500 animate-bounce' : 'bg-gray-300'}`}></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Processing</span>
                <div className={`w-3 h-3 rounded-full ${uploadProgress >= 75 ? 'bg-green-500 animate-bounce' : 'bg-gray-300'}`}></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Finalizing</span>
                <div className={`w-3 h-3 rounded-full ${uploadProgress >= 90 ? 'bg-green-500 animate-bounce' : 'bg-gray-300'}`}></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div
              className={`block w-full p-8 border-2 border-dashed rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                isDragOver 
                  ? 'border-blue-400 bg-blue-50' 
                  : dragError 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-slate-300 hover:border-blue-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={onFileUpload}
                className="hidden"
              />
              <div className="text-center">
                {dragError ? (
                  <>
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-red-600 font-medium mb-2">Upload Error</p>
                    <p className="text-red-500 text-sm">{dragError}</p>
                  </>
                ) : isDragOver ? (
                  <>
                    <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-bounce" />
                    <p className="text-blue-600 font-medium">Drop your file here</p>
                  </>
                ) : (
                  <>
                    <div className="relative mb-4">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <FileText className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-slate-600 mb-2">
                      <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-slate-500 mb-4">PDF or DOCX files only (max 10MB)</p>
                    
                    {/* File Type Icons */}
                    <div className="flex justify-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm text-slate-500">
                        <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                          <span className="text-red-600 font-bold text-xs">PDF</span>
                        </div>
                        <span>PDF</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-500">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-xs">DOC</span>
                        </div>
                        <span>DOCX</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Upload Tips */}
            {!dragError && !isDragOver && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Upload Tips:</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Ensure your resume is clear and well-formatted</li>
                  <li>• Include relevant keywords for better analysis</li>
                  <li>• Keep file size under 10MB for faster processing</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 