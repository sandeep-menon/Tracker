import { useStatusStore } from "@/store/status";
import Timer from "./timer";

function AppFooter() {
    const status = useStatusStore((state) => state.status);

    return (
        <footer className="border-t px-4 py-1">
            <div className="flex items-center justify-between gap-2 select-none">
                <div className='text-gray-500 text-xs'>
                    {status}
                </div>
                <div className='text-gray-500 text-xs text-nowrap'>
                    <Timer />
                </div>
            </div>
        </footer>
    )
}

export default AppFooter;