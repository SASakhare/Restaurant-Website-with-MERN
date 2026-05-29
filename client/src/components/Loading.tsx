import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4">
                <Loader2 className="h-14 w-14 animate-spin text-orange-500" />

                <h2 className="text-xl font-bold">
                    RoyalMasala
                </h2>

                <p className="text-gray-500">
                    Loading your experience...
                </p>
            </div>
        </div>
    );
};

export default Loading;