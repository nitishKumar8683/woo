"use client"; 

import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader"; 

const LoaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <Loader /> : <>{children}</>;
};

export default LoaderWrapper;
