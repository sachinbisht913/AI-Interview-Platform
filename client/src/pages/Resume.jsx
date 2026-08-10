// File: src/pages/Resume.jsx

import { useState } from "react";

import UploadArea from "../components/resume/UploadArea";
import UploadButton from "../components/resume/UploadButton";

import { useNavigate } from "react-router-dom";
import { uploadResume } from "../api/resumeApi";
import LoadingOverlay from "../components/resume/LoadingOverlay";
import toast from "react-hot-toast";

function Resume() {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleUpload = async () => {

        if (!file) {
            return toast.error("Select PDF");
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("resume", file);

            const response = await uploadResume(formData);

            navigate("/resume-analysis", {
                state: {
                    analysis: response.data.data.analysis,
                },
            });

        }

    //  catch (error) {

    //     console.error("RESUME UPLOAD ERROR:", error);
    
    //     console.error("Response:", error.response);
    
    //     console.error("Response data:", error.response?.data);
    
    //     toast.error(
    //         error.response?.data?.message ||
    //         "Failed to upload resume."
    //     );
    
    // } finally {
    
    //     setLoading(false);
    
    // }
         catch (error) {

            toast.error("Failed to upload resume.");

        } finally {

            setLoading(false);

        }

    };


    if (loading) {
        return <LoadingOverlay />;
    }


    return (

        <div className="resume-page min-h-screen bg-slate-950">

            <div
                className="
                    mx-auto
                    w-full
                    max-w-4xl
                    px-4
                    py-12

                    sm:px-6
                    sm:py-16

                    lg:px-8
                    lg:py-20
                "
            >

                {/* Heading */}

                <h1
                    className="
                        resume-title
                        text-center
                        text-3xl
                        font-bold
                        leading-tight
                        text-white

                        sm:text-4xl

                        lg:text-5xl
                    "
                >
                    AI Resume Analyzer
                </h1>


                <p
                    className="
                        resume-description
                        mx-auto
                        mt-4
                        max-w-2xl
                        text-center
                        text-sm
                        leading-6
                        text-slate-400

                        sm:mt-5
                        sm:text-base
                        sm:leading-7

                        lg:text-lg
                    "
                >
                    Upload your resume and receive ATS score,
                    AI feedback and interview questions.
                </p>


                {/* Upload Area */}

                <div className="mt-10 sm:mt-12 lg:mt-16">

                    <UploadArea
                        file={file}
                        setFile={setFile}
                    />

                </div>


                {/* Upload Button */}

                <div className="mt-6 sm:mt-8">

                    <UploadButton
                        loading={loading}
                        onClick={handleUpload}
                    />

                </div>

            </div>

        </div>

    );
}

export default Resume;