import React from "react";
import { AlertTriangle } from "lucide-react";

interface SomethingWentWrongProps {
    error?: string;
}

const SomethingWentWrong: React.FC<SomethingWentWrongProps> = ({ error }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white shadow-md rounded-2xl p-6 max-w-md text-center">
                <div className="flex justify-center mb-4">
                    <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">Something Went Wrong</h1>
                <p className="text-gray-600 mb-4">We encountered an unexpected error. Please try again later.</p>
                {error && (
                    <div className="bg-red-100 text-red-700 text-sm rounded-md p-3 mt-2 break-words">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SomethingWentWrong;
