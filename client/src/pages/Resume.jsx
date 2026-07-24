import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import UploadArea from "../components/resume/UploadArea";
import UploadButton from "../components/resume/UploadButton";

import { useNavigate } from "react-router-dom";
import { uploadResume } from "../api/resumeApi";
import LoadingOverlay from "../components/resume/LoadingOverlay";

function Resume() {

    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {

        if (!file)
            return alert("Select PDF");
    
        try {
    
            setLoading(true);
    
            const formData = new FormData();
    
            formData.append("resume", file);
    
            const token = localStorage.getItem("token");
    
            const response = await uploadResume(
                formData,
                token
            );
    
            navigate("/resume-analysis", {
                state: {
                    analysis: response.data.data.analysis,
                },
            });
    
        } catch (error) {
    
            alert(
                error.response?.data?.message ||
                "Upload Failed"
            );
    
        } finally {
    
            setLoading(false);
    
        }
    
    };

    if (loading) {
        return <LoadingOverlay />;
    }

    return (

        <div className="min-h-screen bg-slate-950">

            <Navbar />

            <div className="max-w-4xl mx-auto py-20 px-6">

                <h1 className="text-center text-5xl font-bold text-white">

                    AI Resume Analyzer

                </h1>

                <p className="text-center text-slate-400 mt-5 text-lg">

                    Upload your resume and receive ATS score,

                    AI feedback and interview questions.

                </p>

                <div className="mt-16">

                    <UploadArea

                        file={file}

                        setFile={setFile}

                    />

                </div>

                <UploadButton
    loading={loading}
    onClick={handleUpload}
/>

            </div>

        </div>

    );

}

export default Resume;