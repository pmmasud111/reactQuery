import { createContext, useState } from "react";

export const DetailContext = createContext();

export const DetailContextProvider = ({ children }) => {
  const [detailProduct, setDetailProduct] = useState(10);
  return (
    <DetailContext.Provider value={{ detailProduct, setDetailProduct }}>
      {children}
    </DetailContext.Provider>
  );
};
