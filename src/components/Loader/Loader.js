// components/Loader/Loader.tsx
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-animation z-50 p-4">
            <div className="text-center">
                <ClipLoader size={80} color={"#ffffff"} />
            </div>
        </div>
    );
};

export default Loader;
