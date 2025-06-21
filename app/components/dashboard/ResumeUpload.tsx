import { Upload } from "lucide-react";

interface ResumeUploadProps {
  isUploading: boolean;
  uploadProgress: number;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ResumeUpload({ isUploading, uploadProgress, onFileUpload }: ResumeUploadProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Your Resume</h2>
        <p className="text-slate-600 mb-6">Get AI-powered analysis and insights to improve your resume</p>
        
        {isUploading ? (
          <div className="max-w-md mx-auto">
            <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-slate-600">Uploading... {uploadProgress}%</p>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <label className="block w-full p-8 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 transition-colors cursor-pointer">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={onFileUpload}
                className="hidden"
              />
              <div className="text-center">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600 mb-1">
                  <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-slate-500">PDF or DOCX files only</p>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
} 