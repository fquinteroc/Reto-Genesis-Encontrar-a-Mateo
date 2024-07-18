"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

/* eslint-disable @next/next/no-img-element */

const decodeBase64ToJson = (base64String: string) => {
  const jsonString = atob(base64String.split(",")[1]);
  return JSON.parse(jsonString);
};

const Home: NextPage = () => {
  const [tokenMetadata, setTokenMetadata] = useState<any[]>([]);
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const { data: uris, isLoading } = useScaffoldReadContract({
    contractName: "GenesisToken",
    functionName: "getAllTokenURIs",
  });

  useEffect(() => {
    if (uris) {
      const decodedMetadata = uris.map(uri => decodeBase64ToJson(uri));
      setTokenMetadata([...decodedMetadata]);
    }
  }, [uris]);

  const handleCardClick = (metadata: any) => {
    setSelectedToken(metadata);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl px-5">
        {selectedToken ? (
          <div className="bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8">
            <h2 className="text-center text-2xl font-bold mb-6">{selectedToken.name}</h2>
            <div className="flex justify-center">
              <img
                src={selectedToken.image}
                alt={selectedToken.name}
                width={500}
                height={500}
                className="rounded-t-lg"
              />
            </div>
            <p className="text-center text-gray-700 mt-4">{selectedToken.description}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
              onClick={() => setSelectedToken(null)}
            >
              Volver a la Galería
            </button>
          </div>
        ) : (
          <div className="bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8">
            <h2 className="text-center text-2xl font-bold mb-6">Personas Buscadas 🔎 </h2>
            {isLoading ? (
              <p className="text-gray-500">Cargando listado de personas buscadas...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tokenMetadata.map((metadata, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
                    onClick={() => handleCardClick(metadata)}
                  >
                    <img src={metadata.image} alt={metadata.name} width={500} height={500} className="rounded-t-lg" />
                    <div className="p-4">
                      <h3 className="text-xl font-bold">{metadata.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
